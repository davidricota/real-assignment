import { useBlockProps, RichText } from "@wordpress/block-editor";

export default function save({ attributes }) {
  const {
    title = "",
    subtitle = "",
    imageUrl = "",
    imageCaption = "",
    tiers = [],
    subcontentTitle = "",
    subcontent = "",
  } = attributes;
  const blockProps = useBlockProps.save();

  return (
    <section {...blockProps} className="legacy">
      <div className="legacy__container">
        <div className="legacy__tabs">
          <div className="legacy__tabs-heading" role="tablist">
            <button className="legacy__tab-title" aria-selected="false" role="tab" tabIndex="-1">
              <span className="legacy__tab-title-text">01. Build</span>
            </button>
            <button className="legacy__tab-title" aria-selected="false" role="tab" tabIndex="-1">
              <span className="legacy__tab-title-text">02. Grow</span>
            </button>
            <button
              className="legacy__tab-title legacy__tab-title-active"
              aria-selected="false"
              role="tab"
              tabIndex="-1"
            >
              <span className="legacy__tab-title-text">03. Legacy</span>
            </button>
          </div>
        </div>
        <div className="legacy__tabs-content">
          <div className="legacy__row">
            <div className="legacy__card">
              {title && <h2 className="legacy__title">{title}</h2>}

              {subtitle && <h3 className="legacy__subtitle">{subtitle}</h3>}
            </div>

            {imageUrl && (
              <div className="legacy__image-container">
                <img
                  src={imageUrl}
                  alt={title || "Legacy"}
                  className="legacy__image"
                  loading="lazy"
                />
                <div className="legacy__image-caption">
                  {imageCaption && <p>{imageCaption}</p>}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="373"
                    height="6"
                    viewBox="0 0 373 6"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_1_380)">
                      <rect
                        width="371.621"
                        height="5.13879"
                        transform="translate(0.625488 0.320312)"
                        fill="#EAEAEA"
                        fill-opacity="0.2"
                      />
                      <rect
                        x="0.625488"
                        y="0.320312"
                        width="238.332"
                        height="4.59697"
                        rx="2.29848"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_380">
                        <rect
                          width="371.621"
                          height="5.13879"
                          fill="white"
                          transform="translate(0.625488 0.320312)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            )}
          </div>
          {tiers && tiers.length > 0 && (
            <div className="legacy__row">
              <div className="legacy__tiers-list">
                {tiers.map((tier, index) => (
                  <div key={tier.id || index} className="legacy__tier-item">
                    <div className="legacy__tier-header">
                      <span className="legacy__tier-percentage">{tier.percentage}%</span>
                      <span className="legacy__tier-description">{tier.description}</span>
                    </div>
                    <div className="legacy__tier-separator"></div>
                    {tier.agents && <div className="legacy__tier-agents">{tier.agents}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {(subcontentTitle || subcontent) && (
            <div className="legacy__row">
              <div className="legacy__subcontent">
                {subcontentTitle && <h3 className="legacy__subcontent-title">{subcontentTitle}</h3>}
                {subcontent && (
                  <div
                    className="legacy__subcontent-content"
                    dangerouslySetInnerHTML={{ __html: subcontent }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
