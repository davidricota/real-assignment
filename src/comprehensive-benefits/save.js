import { useBlockProps, RichText } from "@wordpress/block-editor";

export default function save({ attributes }) {
  const { content = "", benefits = [] } = attributes;
  const blockProps = useBlockProps.save();

  return (
    <section {...blockProps} className="comprehensive-benefits">
      <div className="comprehensive-benefits__container">
        <h2 className="comprehensive-benefits__title">comprehensive benefits</h2>
        {content && (
          <div
            tagName="h3"
            className="comprehensive-benefits__content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}

        {benefits && benefits.length > 0 ? (
          <div className="comprehensive-benefits__list">
            {benefits.map((benefit, index) => (
              <div key={benefit.id || index} className="comprehensive-benefit__item">
                {benefit.title && (
                  <h4 className="comprehensive-benefit__title">
                    <span> {String(index + 1).padStart(2, "0")}</span>
                    {benefit.title}
                  </h4>
                )}
                {benefit.content && (
                  <div
                    className="comprehensive-benefit__content"
                    dangerouslySetInnerHTML={{ __html: benefit.content }}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="comprehensive-benefits__placeholder">
            <p>No benefits have been added yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
