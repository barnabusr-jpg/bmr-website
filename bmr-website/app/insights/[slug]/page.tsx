import { notFound } from "next/navigation";

const posts: Record<string, { title: string; body: string }> = {
  "tge-field-guide": {
    title: "Field Guide: Trust → Govern → Evolve",
    body: "A practical blueprint to move from pilots to scaled AI adoption in regulated orgs. (Replace with your full content.)",
  },
  "hai-playbook": {
    title: "Playbook: Human–AI Interaction (HAI)",
    body: "Make AI useful and safe in daily workflows with role-based design. (Replace with your full content.)",
  },
  "aia-template": {
    title: "Template: Algorithmic Impact Assessment",
    body: "Identify risks, harms, mitigations, and controls before deployment. (Replace with your full content.)",
  },
};

export default function Insight({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];
  if (!post) return notFound();
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="mt-4 text-gray-700 whitespace-pre-line">{post.body}</p>
    </main>
  );
}
