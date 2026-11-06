import Split from "@/components/Split";
import { TLink } from "@/components/TransitionProvider";

export default function NotFound() {
  return (
    <section className="on-light flex min-h-[100svh] flex-col justify-center bg-ink py-32 text-bone">
      <div className="gutter mx-auto w-full max-w-[1900px]">
        <p className="eyebrow vl-fade mb-8 text-ember">Error 404</p>
        <h1 className="t-display t-xl">
          <Split text="Wrong *door.*" mode="css" emClass="text-ember" />
        </h1>
        <p className="vl-fade mt-8 max-w-[40ch] text-lg leading-relaxed text-mist" style={{ ["--d" as string]: "0.6s" }}>
          That page does not exist. The rooms do, though, and so does the sea.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <TLink href="/" className="btn btn-clay">
            Back to the front desk
          </TLink>
          <TLink href="/rooms" className="btn btn-ghost">
            See the rooms
          </TLink>
        </div>
      </div>
    </section>
  );
}
