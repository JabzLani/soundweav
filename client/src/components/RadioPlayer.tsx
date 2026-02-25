import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { streamingService, StreamStatus } from '@/services/streamingService';

interface RadioPlayerProps {
  title?: string;
  artist?: string;
  showNowPlaying?: boolean;
}

export default function RadioPlayer({ 
  title = 'SoundWeave Radio',
  artist = 'Live Stream',
  showNowPlaying = true 
}: RadioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [listeners, setListeners] = useState(1234);
  const [bitrate, setBitrate] = useState('128');
  const [nowPlaying, setNowPlaying] = useState({
    track: 'Neon Dreams',
    artist: 'Luna Echo',
  });
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize streaming service
    streamingService.initialize();
    streamingService.setVolume(volume);

    // Register status callback
    streamingService.onStatusChange((status: StreamStatus) => {
      setIsPlaying(status.isPlaying);
      setIsConnected(status.isConnected);
      setError(status.error || null);
      if (status.listeners) setListeners(status.listeners);
      if (status.bitrate) setBitrate(status.bitrate.toString());
    });

    return () => {
      streamingService.destroy();
    };
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      streamingService.pause();
      setIsPlaying(false);
    } else {
      streamingService.play();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    const vol = newVolume[0];
    setVolume(vol);
    streamingService.setVolume(vol);
    if (vol > 0 && isMuted) {
      setIsMuted(false);
      streamingService.setMuted(false);
    }
  };

  const handleMuteToggle = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    streamingService.setMuted(newMuted);
  };

  const handleBitrateChange = (newBitrate: string) => {
    setBitrate(newBitrate);
    // In a real implementation, this would change the stream URL
    // streamingService.setStreamUrl(`http://localhost:8000/live?bitrate=${newBitrate}`);
  };

  return (
    <div
      ref={playerRef}
      className="w-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6 space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Radio className="w-6 h-6 text-primary" />
            {isConnected && (
              <div className="absolute inset-0 animate-pulse">
                <Radio className="w-6 h-6 text-primary opacity-50" />
              </div>
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground">{artist}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="px-3 py-1 bg-accent/20 text-accent rounded-full font-semibold">
            {listeners.toLocaleString()} listeners
          </span>
        </div>
      </div>

      {/* Now Playing Info */}
      {showNowPlaying && (
        <div className="bg-card/50 rounded-lg p-4 border border-border/50">
          <p className="text-xs text-muted-foreground mb-1">NOW PLAYING</p>
          <h4 className="font-bold text-lg">{nowPlaying.track}</h4>
          <p className="text-sm text-muted-foreground">{nowPlaying.artist}</p>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-center gap-2 text-red-600">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Controls */}
      <div className="space-y-4">
        {/* Play/Pause and Status */}
        <div className="flex items-center justify-between">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full w-16 h-16 flex items-center justify-center"
            onClick={handlePlayPause}
            disabled={!isConnected && !isPlaying}
          >
            {!isConnected && !isPlaying ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-0.5" />
            )}
          </Button>

          <div className="flex-1 mx-6 space-y-2">
            {/* Volume Control */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleMuteToggle}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <Slider
                value={[isMuted ? 0 : volume]}
                onValueChange={handleVolumeChange}
                min={0}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground w-8 text-right">
                {isMuted ? 0 : Math.round(volume)}%
              </span>
            </div>

            {/* Bitrate Selector */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground font-semibold">Bitrate:</span>
              <div className="flex gap-2">
                {['64', '128', '192', '256'].map((br) => (
                  <button
                    key={br}
                    onClick={() => handleBitrateChange(br)}
                    className={`px-2 py-1 text-xs rounded transition-colors ${
                      bitrate === br
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {br}k
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex flex-col items-end gap-1">
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              }`}
            />
            <span className="text-xs text-muted-foreground">
              {isConnected ? 'Connected' : 'Offline'}
            </span>
          </div>
        </div>

        {/* Stream Info */}
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div className="bg-muted/50 rounded-lg p-2">
            <p className="text-xs text-muted-foreground">Stream</p>
            <p className="font-semibold">MP3</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-2">
            <p className="text-xs text-muted-foreground">Bitrate</p>
            <p className="font-semibold">{bitrate} kbps</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-2">
            <p className="text-xs text-muted-foreground">Status</p>
            <p className="font-semibold">{isConnected ? 'Live' : 'Offline'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
