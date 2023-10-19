import Link from "next/link";
import { compareDesc } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";

function PostCard(post: Post) {
  const Content = getMDXComponent(post.body.code);

  return (
    <div className="max-w-sm rounded-[1.25rem] overflow-hidden shadow-lg w-full">
      <Link href={post.url}>
        <img
          className="w-full max-h-[30rem]"
          src={post.image}
          alt={post.title}
        />
      </Link>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          <Link href={post.url}>{post.title}</Link>
        </div>

        <div className="text-gray-700 text-base h-12 overflow-hidden">
          {post.desc}
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        {post.tags &&
          post.tags.map((tag, idx) => (
            <Link href={post.url}>
              <span
                key={idx}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                #{tag}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="py-8 flex justify-center space-x-[2rem]">
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  );
}
