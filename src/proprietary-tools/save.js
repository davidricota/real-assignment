import { useBlockProps } from "@wordpress/block-editor";

export default function save({ attributes }) {
  const { tools = [] } = attributes;
  const blockProps = useBlockProps.save();

  // Fallback content when no tools are added
  if (!tools || tools.length === 0) {
    return (
      <div {...blockProps}>
        <section className="proprietary-tools">
          <div className="proprietary-tools__container">
            <div className="proprietary-tools__placeholder">
              <p>No tools have been added yet.</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <section {...blockProps} className="proprietary-tools">
      <div className="proprietary-tools__container">
        <h2 className="proprietary-tools__title">Proprietary Tools</h2>
        <div className="proprietary-tools__tabs" data-tabs>
          {/* Desktop: Tabs Navigation */}
          <div className="proprietary-tools__tabs-heading" role="tablist">
            {tools.map((tool, index) => (
              <button
                key={tool.id || index}
                id={`proprietary-tab-title-${tool.id || index}`}
                className="proprietary-tools__tab-title"
                aria-selected="false"
                data-tab-index={index + 1}
                data-title={tool.title}
                role="tab"
                tabIndex="-1"
                aria-controls={`proprietary-tab-content-${tool.id || index}`}
              >
                <span className="proprietary-tools__tab-title-text">{tool.title}.</span>
              </button>
            ))}
          </div>

          <div className="proprietary-tools__tabs-content">
            {tools.map((tool, index) => (
              <div
                key={tool.id || index}
                id={`proprietary-tab-content-${tool.id || index}`}
                role="tabpanel"
                aria-labelledby={`proprietary-tab-title-${tool.id || index}`}
                data-tab-index={index + 1}
                data-title={tool.title}
                className="proprietary-tools__tab-content"
              >
                <div className="proprietary-tools__tab-inner">
                  {/* Text Content */}
                  <div className="proprietary-tools__tab-text">
                    {tool.content && (
                      <div className="proprietary-tools__tab-description">{tool.content}</div>
                    )}
                  </div>

                  {/* Image Content */}
                  {tool.imageUrl && (
                    <div className="proprietary-tools__tab-image">
                      <div className="proprietary-tools__tab-image-wrapper">
                        <img src={tool.imageUrl} alt={tool.title} loading="lazy" decoding="async" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
