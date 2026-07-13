import { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { ScrollAnimation } from '@/components/ScrollAnimation';
import { trackEvent, trackExternalLink } from '@/lib/analytics';

const CHANNEL_URL = 'https://www.youtube.com/@NicoletteBuilds';

// ID → title mapping verified against each video's actual watch page —
// thumbnails, titles, and durations must stay in sync with the real uploads.
const VIDEOS = [
  {
    id: 'uIninUvpRaU',
    title: 'How I Built a Full-Stack AI Platform for South Africa',
    subtitle: 'React + Node.js + Python + Azure OpenAI',
    duration: '8:52',
  },
  {
    id: '7IllQ0LMndo',
    title: 'I Built a Supplier Invoice Automation Pipeline from Scratch',
    subtitle: 'n8n + PostgreSQL + Gmail',
    duration: '15:50',
  },
  {
    id: 'Lukkjf7n0IU',
    title: 'Interview Replay — AI Interview Coach with Receipts',
    subtitle: 'Hackathon Demo',
    duration: '2:31',
  },
  {
    id: 'Ist1QrlhFIg',
    title: 'How I Built a Gamified Fitness App That Users Actually Love',
    subtitle: 'Flutter + Firebase',
    duration: '12:50',
  },
];

const VideoCard = ({ video }: { video: (typeof VIDEOS)[number] }) => {
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
    trackEvent('video_play', { video: video.id });
  };

  return (
    <div className="group relative overflow-hidden rounded-lg glass shadow-premium border border-primary/20 hover:border-primary/50 transition-colors duration-300">
      <div className="relative aspect-video">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={handlePlay}
            className="absolute inset-0 h-full w-full"
            aria-label={`Play: ${video.title}`}
          >
            <img
              src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
            <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs font-medium text-white tabular-nums">
              {video.duration}
            </span>
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/40 transition-transform duration-300 group-hover:scale-110">
                <Play className="h-6 w-6 ml-0.5 text-primary-foreground" fill="currentColor" />
              </span>
            </span>
          </button>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-foreground leading-snug">{video.title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{video.subtitle}</p>
      </div>
    </div>
  );
};

export const VideosSection = () => {
  return (
    <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimation animation="cinematic">
          <div className="mb-8 sm:mb-12 md:mb-16 text-center">
            <p className="eyebrow-label text-primary mb-3">Build in Public</p>
            <h2 className="heading-fluid-lg font-bold font-display mb-2 sm:mb-3 md:mb-4">
              I Document How I Actually Build These
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
              Real walkthroughs of the systems in my projects section, recorded while I build
              them, not after.{' '}
              <a
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackExternalLink(CHANNEL_URL, 'youtube_channel')}
                className="inline-flex items-center gap-1 text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
              >
                Full channel
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-up" delay={100}>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VIDEOS.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};
