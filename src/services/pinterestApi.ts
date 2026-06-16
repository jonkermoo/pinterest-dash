// Pinterest API Service
// Handles all interactions with Pinterest API v5
// Uses localStorage for configuration (no .env required)

interface PinterestConfig {
  appId: string;
  appSecret: string;
  redirectUri: string;
  apiUrl: string;
}

interface PinAnalytics {
  pin_id: string;
  date: string;
  impression: number;
  save: number;
  pin_click: number;
  outbound_click: number;
}

interface BoardAnalytics {
  board_id: string;
  date: string;
  impression: number;
  save: number;
  pin_click: number;
}

interface Pin {
  id: string;
  title: string;
  description: string;
  link: string;
  media: {
    images: {
      [key: string]: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
  board_id: string;
  created_at: string;
}

interface Board {
  id: string;
  name: string;
  description: string;
  privacy: string;
  pin_count: number;
}

class PinterestApiService {
  private getConfig(): PinterestConfig {
    // Get configuration from localStorage (user-provided)
    const appId = localStorage.getItem('pinterest_app_id') || '';
    const appSecret = localStorage.getItem('pinterest_app_secret') || '';
    const redirectUri = localStorage.getItem('pinterest_redirect_uri') || window.location.origin + '/callback';
    
    return {
      appId,
      appSecret,
      redirectUri,
      apiUrl: 'https://api.pinterest.com/v5',
    };
  }

  private validateConfig(): void {
    const config = this.getConfig();
    if (!config.appId || !config.appSecret) {
      throw new Error('Pinterest API credentials not configured. Please go to Settings to add your App ID and Secret.');
    }
  }

  // Generate OAuth authorization URL
  getAuthorizationUrl(state?: string): string {
    this.validateConfig();
    const config = this.getConfig();
    
    const params = new URLSearchParams({
      client_id: config.appId,
      redirect_uri: config.redirectUri,
      response_type: 'code',
      scope: 'boards:read,boards:write,pins:read,pins:write,user_accounts:read',
      state: state || this.generateState(),
    });

    return `https://www.pinterest.com/oauth/?${params.toString()}`;
  }

  // Generate random state for CSRF protection
  private generateState(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  // Exchange authorization code for access token
  async exchangeCodeForToken(code: string): Promise<{
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
  }> {
    this.validateConfig();
    const config = this.getConfig();
    
    const response = await fetch('https://api.pinterest.com/v5/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${config.appId}:${config.appSecret}`)}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: config.redirectUri,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to exchange code for token: ${error.message || response.statusText}`);
    }

    return response.json();
  }

  // Refresh access token
  async refreshAccessToken(refreshToken: string): Promise<{
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
  }> {
    this.validateConfig();
    const config = this.getConfig();
    
    const response = await fetch('https://api.pinterest.com/v5/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${config.appId}:${config.appSecret}`)}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to refresh token: ${error.message || response.statusText}`);
    }

    return response.json();
  }

  // Get user account information
  async getUserAccount(accessToken: string): Promise<any> {
    const config = this.getConfig();
    const response = await fetch(`${config.apiUrl}/user_account`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get user account: ${response.statusText}`);
    }

    return response.json();
  }

  // Get user's boards
  async getBoards(accessToken: string): Promise<{ items: Board[] }> {
    const config = this.getConfig();
    const response = await fetch(`${config.apiUrl}/boards`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get boards: ${response.statusText}`);
    }

    return response.json();
  }

  // Get pins from a specific board
  async getBoardPins(accessToken: string, boardId: string): Promise<{ items: Pin[] }> {
    const config = this.getConfig();
    const response = await fetch(`${config.apiUrl}/boards/${boardId}/pins`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get board pins: ${response.statusText}`);
    }

    return response.json();
  }

  // Get pin analytics
  async getPinAnalytics(
    accessToken: string,
    pinId: string,
    startDate: string,
    endDate: string,
    metricTypes: string[] = ['IMPRESSION', 'SAVE', 'PIN_CLICK', 'OUTBOUND_CLICK']
  ): Promise<PinAnalytics[]> {
    const config = this.getConfig();
    const params = new URLSearchParams({
      start_date: startDate,
      end_date: endDate,
      metric_types: metricTypes.join(','),
    });

    const response = await fetch(
      `${config.apiUrl}/pins/${pinId}/analytics?${params.toString()}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get pin analytics: ${response.statusText}`);
    }

    const data = await response.json();
    return data.all || [];
  }

  // Get board analytics
  async getBoardAnalytics(
    accessToken: string,
    boardId: string,
    startDate: string,
    endDate: string,
    metricTypes: string[] = ['IMPRESSION', 'SAVE', 'PIN_CLICK']
  ): Promise<BoardAnalytics[]> {
    const config = this.getConfig();
    const params = new URLSearchParams({
      start_date: startDate,
      end_date: endDate,
      metric_types: metricTypes.join(','),
    });

    const response = await fetch(
      `${config.apiUrl}/boards/${boardId}/analytics?${params.toString()}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get board analytics: ${response.statusText}`);
    }

    const data = await response.json();
    return data.all || [];
  }

  // Get user account analytics
  async getUserAnalytics(
    accessToken: string,
    startDate: string,
    endDate: string,
    metricTypes: string[] = ['IMPRESSION', 'SAVE', 'PIN_CLICK', 'OUTBOUND_CLICK']
  ): Promise<any> {
    const config = this.getConfig();
    const params = new URLSearchParams({
      start_date: startDate,
      end_date: endDate,
      metric_types: metricTypes.join(','),
    });

    const response = await fetch(
      `${config.apiUrl}/user_account/analytics?${params.toString()}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get user analytics: ${response.statusText}`);
    }

    return response.json();
  }

  // Create a new pin
  async createPin(
    accessToken: string,
    pinData: {
      board_id: string;
      title?: string;
      description?: string;
      link?: string;
      media_source: {
        source_type: 'image_url' | 'image_base64';
        url?: string;
        data?: string;
        content_type?: string;
      };
    }
  ): Promise<Pin> {
    const config = this.getConfig();
    const response = await fetch(`${config.apiUrl}/pins`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pinData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to create pin: ${error.message || response.statusText}`);
    }

    return response.json();
  }

  // Check if API is configured
  isConfigured(): boolean {
    const config = this.getConfig();
    return !!(config.appId && config.appSecret && config.redirectUri);
  }
}

export const pinterestApi = new PinterestApiService();
export type { PinAnalytics, BoardAnalytics, Pin, Board };

// Made with Bob
