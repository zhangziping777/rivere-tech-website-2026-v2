import { notFound } from "next/navigation";
import { getSolutionData, getAllSolutionSlugs } from "@/lib/data";
import SolutionHero from "@/components/solutions/SolutionHero";
import ConceptHighlight from "@/components/solutions/ConceptHighlight";
import ArchitectureTopology from "@/components/solutions/ArchitectureTopology";
import ComparisonTable from "@/components/solutions/ComparisonTable";
import ScrollSpyLayout from "@/components/solutions/ScrollSpyLayout";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSolutionSlugs().map((slug) => ({ slug }));
}

export default async function SolutionPage({ params }: PageProps) {
  const { slug } = await params;
  const data = getSolutionData(slug);

  if (!data) notFound();

  return (
    <main className="min-h-screen">
      {/* ── Hero ── */}
      <SolutionHero
        name={data.name}
        tagline={data.tagline}
        description={data.description}
        metrics={data.heroMetrics}
      />

      {/* ── TXA Concept Highlight ── */}
      <section className="mx-auto max-w-[1280px] px-6 pb-20">
        <ConceptHighlight title={data.txaTitle} points={data.txaPoints} />
      </section>

      {/* ── Architecture Topology ── */}
      <section className="mx-auto max-w-[1280px] px-6 pb-20">
        <div className="mb-8">
          <p className="text-accent-green text-xs font-medium tracking-widest uppercase mb-2">
            System Architecture
          </p>
          <h2 className="text-2xl font-bold text-text-primary">系统分层架构</h2>
        </div>
        <ArchitectureTopology layers={data.architecture} />
      </section>

      {/* ── ScrollSpy Content ── */}
      <section className="mx-auto max-w-[1280px] px-6 pb-20">
        <ScrollSpyLayout sections={data.sections} />
      </section>

      {/* ── Comparison Table ── */}
      <section className="mx-auto max-w-[1280px] px-6 pb-24">
        <div className="mb-8">
          <p className="text-accent-green text-xs font-medium tracking-widest uppercase mb-2">
            Solution Comparison
          </p>
          <h2 className="text-2xl font-bold text-text-primary">方案对比</h2>
        </div>
        <ComparisonTable
          headers={data.comparison.headers}
          rows={data.comparison.rows}
        />
      </section>
    </main>
  );
}
