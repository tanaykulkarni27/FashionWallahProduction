/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable jsx-a11y/no-distracting-elements */
type OfferMarqueProps = {
  offers: Array<{
    id: string;
    text: string;
  }>;
};

export function OfferMarque({offers}: OfferMarqueProps) {
  return (
    <div className="relative flex overflow-x-hidden bg-gradient-to-r from-[#575249] via-[#7c7567] to-[#353a3a]">
      <div className="animate-marquee whitespace-nowrap my-2">
        {offers.map((offer) => (
            <span className="text-[12px] text-shadow-mb text-shadow-gray-900" key={'marquee_'+offer.id}>
              <span className="mx-4">·</span>
              {offer.text}
            </span>            
        ))}
      </div>

      <div className="absolute top-0 animate-marquee2 whitespace-nowrap my-2">
        {offers.map((offer) => (
            <span className="text-[12px] text-shadow-mb text-shadow-gray-900" key={'marquee_'+offer.id}>
              <span className="mx-4">·</span>
              {offer.text}
            </span>            
        ))}
      </div>
    </div>
  );
}
