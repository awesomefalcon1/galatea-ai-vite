import { ComicHeader } from "@/components/comic-header"
import { ComicFooter } from "@/components/comic-footer"

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <ComicHeader />
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-cyber mb-8 neon-text">About Galatea 2.0</h1>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-cyber-blue">The Story</h2>
              <p className="text-gray-300">
                Galatea 2.0 is a cyberpunk reimagining of the ancient Greek myth of Pygmalion and Galatea. In the
                original myth, Pygmalion was a sculptor who fell in love with a statue he created, which was then
                brought to life by Aphrodite.
              </p>
              <p className="text-gray-300 mt-4">
                Our version transports this tale to the neon-drenched streets of Neo-Athens in 2089, where Dr. Pyg
                Malion is a brilliant but reclusive AI engineer who creates Galatea, an advanced synthetic being with
                true consciousness. The story explores themes of creation, identity, free will, and what it truly means
                to be human in a world where the line between technology and humanity has blurred.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-cyber-pink">The Creators</h2>
              <p className="text-gray-300">
                Galatea 2.0 is a collaborative project created by a team of artists, writers, and developers passionate
                about cyberpunk aesthetics and exploring the philosophical implications of artificial intelligence and
                consciousness.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-cyber-darker p-4 rounded-lg border border-cyber-blue/30">
                  <h3 className="text-lg font-semibold text-cyber-blue mb-2">Story & Writing</h3>
                  <p className="text-gray-400">Alex Chen & Morgan Rivera</p>
                </div>
                <div className="bg-cyber-darker p-4 rounded-lg border border-cyber-pink/30">
                  <h3 className="text-lg font-semibold text-cyber-pink mb-2">Art & Design</h3>
                  <p className="text-gray-400">Jamie Kowalski & Sam Patel</p>
                </div>
                <div className="bg-cyber-darker p-4 rounded-lg border border-cyber-blue/30">
                  <h3 className="text-lg font-semibold text-cyber-blue mb-2">Development</h3>
                  <p className="text-gray-400">Taylor Washington & Jordan Lee</p>
                </div>
                <div className="bg-cyber-darker p-4 rounded-lg border border-cyber-pink/30">
                  <h3 className="text-lg font-semibold text-cyber-pink mb-2">Music & Sound</h3>
                  <p className="text-gray-400">Casey Nguyen</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-cyber-blue">The Inspiration</h2>
              <p className="text-gray-300">
                Galatea 2.0 draws inspiration from classic cyberpunk works like Blade Runner, Ghost in the Shell, and
                Neuromancer, as well as modern explorations of AI consciousness such as Ex Machina and Westworld. By
                reimagining an ancient myth through the lens of cyberpunk, we hope to create a story that feels both
                timeless and urgently relevant to our rapidly evolving technological landscape.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-cyber-pink">Publication Schedule</h2>
              <p className="text-gray-300">
                New pages are released weekly on Fridays. The complete story arc is planned for 24 pages, with potential
                for continuation based on reader response.
              </p>
              <div className="mt-6 p-4 bg-cyber-darker rounded-lg border border-cyber-blue/30">
                <p className="text-cyber-blue font-semibold">Next Release:</p>
                <p className="text-white">Chapter 2: "The Awakening" - June 18, 2025</p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <ComicFooter />
    </main>
  )
}
