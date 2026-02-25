/**
 * Streaming Service
 * Handles connection to Icecast server and streaming controls
 */

export interface StreamConfig {
  url: string;
  bitrate?: number;
  format?: string;
}

export interface StreamStatus {
  isPlaying: boolean;
  isConnected: boolean;
  currentTrack?: string;
  artist?: string;
  listeners?: number;
  bitrate?: number;
  error?: string;
}

class StreamingService {
  private audio: HTMLAudioElement | null = null;
  private streamUrl: string = 'http://localhost:8000/live'; // Default Icecast URL
  private statusCallback: ((status: StreamStatus) => void) | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;

  constructor(streamUrl?: string) {
    if (streamUrl) {
      this.streamUrl = streamUrl;
    }
  }

  /**
   * Initialize the audio player
   */
  public initialize(): void {
    if (!this.audio) {
      this.audio = new Audio();
      this.audio.crossOrigin = 'anonymous';
      
      // Handle play event
      this.audio.addEventListener('play', () => {
        this.updateStatus({ isPlaying: true, isConnected: true });
      });

      // Handle pause event
      this.audio.addEventListener('pause', () => {
        this.updateStatus({ isPlaying: false });
      });

      // Handle error event
      this.audio.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        this.handleStreamError();
      });

      // Handle ended event
      this.audio.addEventListener('ended', () => {
        this.updateStatus({ isPlaying: false });
      });

      // Handle loadstart
      this.audio.addEventListener('loadstart', () => {
        this.reconnectAttempts = 0;
      });
    }
  }

  /**
   * Play the stream
   */
  public play(): void {
    if (!this.audio) {
      this.initialize();
    }

    if (this.audio && this.audio.src !== this.streamUrl) {
      this.audio.src = this.streamUrl;
    }

    this.audio?.play().catch((error) => {
      console.error('Play error:', error);
      this.handleStreamError();
    });
  }

  /**
   * Pause the stream
   */
  public pause(): void {
    if (this.audio) {
      this.audio.pause();
      this.updateStatus({ isPlaying: false });
    }
  }

  /**
   * Stop the stream
   */
  public stop(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.updateStatus({ isPlaying: false, isConnected: false });
    }
  }

  /**
   * Set volume (0-100)
   */
  public setVolume(volume: number): void {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, volume / 100));
    }
  }

  /**
   * Get current volume (0-100)
   */
  public getVolume(): number {
    if (this.audio) {
      return this.audio.volume * 100;
    }
    return 50;
  }

  /**
   * Set mute state
   */
  public setMuted(muted: boolean): void {
    if (this.audio) {
      this.audio.muted = muted;
    }
  }

  /**
   * Get mute state
   */
  public isMuted(): boolean {
    return this.audio?.muted ?? false;
  }

  /**
   * Change stream URL
   */
  public setStreamUrl(url: string): void {
    this.streamUrl = url;
    const wasPlaying = this.audio?.paused === false;
    
    if (this.audio) {
      this.audio.src = url;
      if (wasPlaying) {
        this.play();
      }
    }
  }

  /**
   * Get current stream URL
   */
  public getStreamUrl(): string {
    return this.streamUrl;
  }

  /**
   * Register status callback
   */
  public onStatusChange(callback: (status: StreamStatus) => void): void {
    this.statusCallback = callback;
  }

  /**
   * Get current status
   */
  public getStatus(): StreamStatus {
    return {
      isPlaying: this.audio ? !this.audio.paused : false,
      isConnected: this.audio ? this.audio.readyState >= 2 : false,
    };
  }

  /**
   * Handle stream errors and reconnect
   */
  private handleStreamError(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      this.updateStatus({
        isConnected: false,
        error: `Connection failed. Reconnecting... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`,
      });

      setTimeout(() => {
        if (this.audio && !this.audio.paused) {
          this.play();
        }
      }, this.reconnectDelay);
    } else {
      this.updateStatus({
        isConnected: false,
        error: 'Failed to connect to stream after multiple attempts',
      });
    }
  }

  /**
   * Update status and call callback
   */
  private updateStatus(partialStatus: Partial<StreamStatus>): void {
    const currentStatus = this.getStatus();
    const newStatus = { ...currentStatus, ...partialStatus };
    
    if (this.statusCallback) {
      this.statusCallback(newStatus);
    }
  }

  /**
   * Cleanup resources
   */
  public destroy(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio = null;
    }
    this.statusCallback = null;
  }
}

// Export singleton instance
export const streamingService = new StreamingService();
