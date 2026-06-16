// Scheduler Service
// Manages scheduled pins in localStorage and handles publishing

export interface ScheduledPin {
  id: string;
  board_id: string;
  title: string;
  description: string;
  link?: string;
  image_url?: string;
  image_base64?: string;
  scheduled_time: string; // ISO 8601 format
  status: 'pending' | 'publishing' | 'published' | 'failed';
  created_at: string;
  published_at?: string;
  error_message?: string;
  pinterest_pin_id?: string;
}

class SchedulerService {
  private readonly STORAGE_KEY = 'scheduled_pins';
  private readonly SCHEDULER_INTERVAL = 60000; // Check every minute
  private intervalId: number | null = null;

  // Get all scheduled pins
  getScheduledPins(): ScheduledPin[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  // Get a single scheduled pin by ID
  getScheduledPin(id: string): ScheduledPin | null {
    const pins = this.getScheduledPins();
    return pins.find(pin => pin.id === id) || null;
  }

  // Save scheduled pins to localStorage
  private saveScheduledPins(pins: ScheduledPin[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(pins));
  }

  // Add a new scheduled pin
  addScheduledPin(pin: Omit<ScheduledPin, 'id' | 'status' | 'created_at'>): ScheduledPin {
    const newPin: ScheduledPin = {
      ...pin,
      id: this.generateId(),
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    const pins = this.getScheduledPins();
    pins.push(newPin);
    this.saveScheduledPins(pins);

    return newPin;
  }

  // Update a scheduled pin
  updateScheduledPin(id: string, updates: Partial<ScheduledPin>): ScheduledPin | null {
    const pins = this.getScheduledPins();
    const index = pins.findIndex(pin => pin.id === id);
    
    if (index === -1) return null;

    pins[index] = { ...pins[index], ...updates };
    this.saveScheduledPins(pins);

    return pins[index];
  }

  // Delete a scheduled pin
  deleteScheduledPin(id: string): boolean {
    const pins = this.getScheduledPins();
    const filteredPins = pins.filter(pin => pin.id !== id);
    
    if (filteredPins.length === pins.length) return false;

    this.saveScheduledPins(filteredPins);
    return true;
  }

  // Get pins that are due for publishing
  getDuePins(): ScheduledPin[] {
    const now = new Date();
    const pins = this.getScheduledPins();
    
    return pins.filter(pin => {
      if (pin.status !== 'pending') return false;
      const scheduledTime = new Date(pin.scheduled_time);
      return scheduledTime <= now;
    });
  }

  // Get pending pins (not yet published)
  getPendingPins(): ScheduledPin[] {
    return this.getScheduledPins().filter(pin => pin.status === 'pending');
  }

  // Get published pins
  getPublishedPins(): ScheduledPin[] {
    return this.getScheduledPins().filter(pin => pin.status === 'published');
  }

  // Get failed pins
  getFailedPins(): ScheduledPin[] {
    return this.getScheduledPins().filter(pin => pin.status === 'failed');
  }

  // Mark pin as publishing
  markAsPublishing(id: string): void {
    this.updateScheduledPin(id, { status: 'publishing' });
  }

  // Mark pin as published
  markAsPublished(id: string, pinterestPinId: string): void {
    this.updateScheduledPin(id, {
      status: 'published',
      published_at: new Date().toISOString(),
      pinterest_pin_id: pinterestPinId,
    });
  }

  // Mark pin as failed
  markAsFailed(id: string, errorMessage: string): void {
    this.updateScheduledPin(id, {
      status: 'failed',
      error_message: errorMessage,
    });
  }

  // Retry a failed pin
  retryPin(id: string): boolean {
    const pin = this.getScheduledPin(id);
    if (!pin || pin.status !== 'failed') return false;

    this.updateScheduledPin(id, {
      status: 'pending',
      error_message: undefined,
    });

    return true;
  }

  // Generate unique ID
  private generateId(): string {
    return `pin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Start the scheduler (checks for due pins every minute)
  startScheduler(publishCallback: (pin: ScheduledPin) => Promise<void>): void {
    if (this.intervalId !== null) {
      console.warn('Scheduler already running');
      return;
    }

    console.log('Starting pin scheduler...');

    // Check immediately
    this.checkAndPublish(publishCallback);

    // Then check every minute
    this.intervalId = window.setInterval(() => {
      this.checkAndPublish(publishCallback);
    }, this.SCHEDULER_INTERVAL);
  }

  // Stop the scheduler
  stopScheduler(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('Pin scheduler stopped');
    }
  }

  // Check for due pins and publish them
  private async checkAndPublish(publishCallback: (pin: ScheduledPin) => Promise<void>): Promise<void> {
    const duePins = this.getDuePins();
    
    if (duePins.length === 0) return;

    console.log(`Found ${duePins.length} pin(s) due for publishing`);

    for (const pin of duePins) {
      try {
        this.markAsPublishing(pin.id);
        await publishCallback(pin);
      } catch (error) {
        console.error(`Failed to publish pin ${pin.id}:`, error);
        this.markAsFailed(
          pin.id,
          error instanceof Error ? error.message : 'Unknown error'
        );
      }
    }
  }

  // Get statistics
  getStats(): {
    total: number;
    pending: number;
    published: number;
    failed: number;
  } {
    const pins = this.getScheduledPins();
    return {
      total: pins.length,
      pending: pins.filter(p => p.status === 'pending').length,
      published: pins.filter(p => p.status === 'published').length,
      failed: pins.filter(p => p.status === 'failed').length,
    };
  }

  // Clear all scheduled pins
  clearAll(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Import pins from CSV data
  importFromCSV(csvData: string): { success: number; errors: string[] } {
    const lines = csvData.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    const requiredFields = ['board_id', 'title', 'scheduled_time'];
    const missingFields = requiredFields.filter(field => !headers.includes(field));
    
    if (missingFields.length > 0) {
      return {
        success: 0,
        errors: [`Missing required columns: ${missingFields.join(', ')}`],
      };
    }

    let success = 0;
    const errors: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      try {
        const values = this.parseCSVLine(line);
        const pin: any = {};

        headers.forEach((header, index) => {
          pin[header] = values[index] || '';
        });

        // Validate required fields
        if (!pin.board_id || !pin.title || !pin.scheduled_time) {
          errors.push(`Line ${i + 1}: Missing required fields`);
          continue;
        }

        // Validate scheduled time
        const scheduledDate = new Date(pin.scheduled_time);
        if (isNaN(scheduledDate.getTime())) {
          errors.push(`Line ${i + 1}: Invalid scheduled_time format`);
          continue;
        }

        this.addScheduledPin({
          board_id: pin.board_id,
          title: pin.title,
          description: pin.description || '',
          link: pin.link || undefined,
          image_url: pin.image_url || undefined,
          scheduled_time: scheduledDate.toISOString(),
        });

        success++;
      } catch (error) {
        errors.push(`Line ${i + 1}: ${error instanceof Error ? error.message : 'Parse error'}`);
      }
    }

    return { success, errors };
  }

  // Parse CSV line handling quoted values
  private parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }

    result.push(current.trim());
    return result;
  }
}

export const schedulerService = new SchedulerService();

// Made with Bob
