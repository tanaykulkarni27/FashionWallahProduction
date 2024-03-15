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
    <div
      className="overflow-x-hidden"
      style={{
        backgroundImage:
          'linear-gradient(70deg,rgba(87,82,73,1) 1%,rgba(124,117,103,1) 55%,rgba(53,58,58,1) 100%)',
      }}
    >
      <div>

      </div>
      <marquee>
        <div className="flex flex-row justify-between items-center">
          {[...offers].map((offer) => (
            <div key={offer.id} className="text-sm mx-5">
              <li>{offer.text}</li>
            </div>
          ))}
        </div>
      </marquee>
    </div>
  );
}
