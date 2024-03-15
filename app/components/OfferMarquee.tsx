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
    <div className="relative flex overflow-x-hidden bg-gradient-to-r from-[#575249] via-[#7c7567]  to-[#353a3a]">
      <div className="py-6 animate-marquee whitespace-nowrap">
        {offers.map((offer) => (
            <span className="mx-4 text-2xl" key={'marquee_'+offer.id}>{offer.text}</span>            
        ))}
      </div>

      <div className="absolute top-0 py-6 animate-marquee2 whitespace-nowrap">
        {offers.map((offer) => (
            <span className="mx-4 text-2xl" key={'marquee_2_'+offer.id}>{offer.text}</span>            
        ))}
      </div>
    </div>
  );
}
