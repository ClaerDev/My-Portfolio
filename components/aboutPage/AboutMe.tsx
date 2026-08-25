import MyInfo from "../MyInfo"

export default function AboutMe() {
  return (
    <div className="px-12 py-10">
      <article className="prose max-w-none prose-h2:mb-2.5 prose-h2:text-[1.6rem] prose-p:text-2xl prose-p:leading-[1.65]">
        <p>
          Senior AI &amp; Full Stack Engineer with 8+ years of experience building
          scalable SaaS platforms, AI applications, and cloud-based systems.
        </p>
        <p>
          Strong experience with LLMs, RAG, AI agents, LangChain, OpenAI APIs,
          FastAPI, React, Kubernetes, and AWS. I focus on writing clean, reliable,
          and easy-to-maintain code — handling the full development process from
          system design and backend development to AI integration, frontend, deployment,
          and performance improvements.
        </p>
      </article>

      <ul className="grid grid-cols-1 mt-6 location sm:grid-cols-2 gap-y-2">
        <MyInfo field="residence" value="Japan" />
        <MyInfo field="address" value="Osaka, Japan" />
        <MyInfo field="email" value="tobeiokita35@gmail.com" />
        <MyInfo field="freelance" value="Available" />
      </ul>
    </div>
  )
}
