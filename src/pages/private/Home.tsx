import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import PostCard from '@/components/PostCard';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/context/AuthProvider';
import { sortPostsByDateDesc } from '@/helpers/sortPosts';
import { usePostActions } from '@/hooks/posts/usePostActions';
import { usePosts } from '@/hooks/posts/usePosts';
import { useExpandedPost } from '@/hooks/ui/useExpandedPost';

export default function PrivateHome() {
  const { auth } = useAuth();
  const { posts, loading, error, refetch } = usePosts();
  const { expandedPostId, toggleComments } = useExpandedPost();
  const { onDeletePost } = usePostActions(refetch);

  const sortedPosts = useMemo(() => sortPostsByDateDesc(posts), [posts]);

  return (
    <section aria-label='Private posts page' className='border-b border-border'>
      <div className='mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:py-16'>
        <div className='flex items-center gap-4'>
          <span className='text-xs tracking-widest text-muted-foreground uppercase'>Dashboard</span>
          <span className='h-px flex-1 bg-border' />
        </div>

        <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
          <h1 className='font-serif text-4xl leading-tight font-semibold text-foreground md:text-5xl'>
            All Posts
          </h1>
          {auth?.role?.toLowerCase() === 'writer' ? (
            <Link
              to='/home/create-post'
              className='inline-flex items-center gap-2 border border-foreground bg-foreground px-6 py-3 text-xs tracking-widest text-background uppercase transition-colors hover:bg-background hover:text-foreground'
            >
              Create post <span aria-hidden='true'>&rarr;</span>
            </Link>
          ) : null}
        </div>

        {loading && <Spinner />}

        {error && <p className='text-sm leading-relaxed text-destructive'>{error}</p>}

        {!loading && !error && sortedPosts.length === 0 && (
          <div className='border border-border p-6'>
            <p className='text-sm leading-relaxed text-muted-foreground'>
              No posts yet. Create your first post to start publishing.
            </p>
          </div>
        )}

        {!loading && !error && sortedPosts.length > 0 && (
          <div className='max-h-[72vh] overflow-y-auto pr-2'>
            <div className='space-y-4'>
              {sortedPosts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  canManage={auth?.role?.toLowerCase() === 'writer' && auth?.id === post.writerId}
                  isUser={auth?.role?.toLowerCase() === 'user'}
                  isCommentsOpen={expandedPostId === post.id}
                  onToggleComments={() => toggleComments(post.id)}
                  onDelete={() => onDeletePost(post.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
