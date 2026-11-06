import { rooms } from "@/data/rooms";
import RoomCard from "../RoomCard";
import Split from "../Split";
import { TLink } from "../TransitionProvider";

const [faro, cala, olivo, pietra] = rooms;

export default function RoomsBento() {
  return (
    <section id="rooms" className="relative bg-ink py-28 text-bone md:py-44">
      <div className="gutter mx-auto max-w-[1900px]">
        <div className="mb-14 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-8 text-ember">Rooms and suites</p>
            <Split as="h2" className="t-display t-lg" text="Twenty-four *ways* to wake up." />
          </div>
          <div data-fade className="max-w-[34ch]">
            <p className="leading-relaxed text-mist">Tap a card to turn it over for sizes, views and rates. Every room faces the sea or the grove, never a car park.</p>
          </div>
        </div>

        <div className="grid gap-3 md:gap-4 lg:grid-cols-12 lg:auto-rows-[26rem]">
          <div data-fade className="h-[34rem] lg:col-span-7 lg:row-span-2 lg:h-auto">
            <RoomCard room={faro} big sizes="(min-width:1024px) 56vw, 94vw" />
          </div>
          <div data-fade className="h-[34rem] lg:col-span-5 lg:h-auto">
            <RoomCard room={cala} dense sizes="(min-width:1024px) 40vw, 94vw" />
          </div>
          <div data-fade className="h-[34rem] lg:col-span-5 lg:h-auto">
            <RoomCard room={olivo} dense sizes="(min-width:1024px) 40vw, 94vw" />
          </div>
          <div data-fade className="h-[34rem] lg:col-span-8 lg:h-auto">
            <RoomCard room={pietra} dense sizes="(min-width:1024px) 64vw, 94vw" />
          </div>
          <div data-fade className="on-light flex h-[22rem] flex-col justify-between bg-clay p-6 text-bone md:p-8 lg:col-span-4 lg:h-auto">
            <p className="eyebrow">Two more</p>
            <div>
              <p className="t-display t-sm mb-8 max-w-[14ch] text-[clamp(2rem,3vw,3.2rem)]">Alba and Brezza, from €240 a night.</p>
              <TLink href="/rooms" data-magnetic data-cursor="" className="btn btn-bone">
                <span data-magnetic-in>All six rooms</span>
              </TLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
