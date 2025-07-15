import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText } from "@wordpress/block-editor";
import { useState } from "@wordpress/element";
import { TextareaControl } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
  const { content = "", benefits = [] } = attributes;
  const [localBenefits, setLocalBenefits] = useState(benefits);

  const addBenefit = () => {
    const newBenefit = {
      id: Date.now(),
      title: "",
      content: "",
    };
    const updatedBenefits = [...localBenefits, newBenefit];
    setLocalBenefits(updatedBenefits);
    setAttributes({ benefits: updatedBenefits });
  };

  const removeBenefit = (index) => {
    const updatedBenefits = localBenefits.filter((_, i) => i !== index);
    setLocalBenefits(updatedBenefits);
    setAttributes({ benefits: updatedBenefits });
  };

  const updateBenefit = (index, field, value) => {
    const updatedBenefits = [...localBenefits];
    updatedBenefits[index] = { ...updatedBenefits[index], [field]: value };
    setLocalBenefits(updatedBenefits);
    setAttributes({ benefits: updatedBenefits });
  };

  return (
    <div {...useBlockProps()}>
      <div style={{ padding: "20px", border: "1px dashed #ccc" }}>
        <h3>{__("Comprehensive Benefits", "real-assignment")}</h3>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            {__("Content", "real-assignment")}
          </label>
          <TextareaControl
            label={null}
            value={content}
            onChange={(value) => setAttributes({ content: value })}
            placeholder={__("Enter content (HTML allowed)...", "real-assignment")}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              minHeight: "100px",
              fontFamily: "monospace",
            }}
          />
        </div>

        <button
          onClick={addBenefit}
          style={{
            background: "#007cba",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          {__("Add Benefit", "real-assignment")}
        </button>

        {localBenefits.length === 0 ? (
          <p>
            {__("No benefits added yet. Click 'Add Benefit' to get started.", "real-assignment")}
          </p>
        ) : (
          <div>
            {localBenefits.map((benefit, index) => (
              <div
                key={benefit.id}
                style={{
                  border: "1px solid #eee",
                  padding: "15px",
                  marginBottom: "15px",
                  borderRadius: "4px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ marginRight: "8px", fontWeight: "bold", color: "#007cba" }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h4>{benefit.title || __("Untitled Benefit", "real-assignment")}</h4>
                  <button
                    onClick={() => removeBenefit(index)}
                    style={{
                      background: "#dc3232",
                      color: "white",
                      border: "none",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    {__("Remove", "real-assignment")}
                  </button>
                </div>

                <input
                  type="text"
                  placeholder={__("Benefit title", "real-assignment")}
                  value={benefit.title || ""}
                  onChange={(e) => updateBenefit(index, "title", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginBottom: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />

                <div style={{ marginBottom: "10px" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                    {__("Benefit content (HTML allowed)", "real-assignment")}
                  </label>
                  <RichText
                    tagName="div"
                    value={benefit.content}
                    onChange={(value) => updateBenefit(index, "content", value)}
                    placeholder={__("Enter benefit content...", "real-assignment")}
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      minHeight: "80px",
                    }}
                  />
                </div>

                {(benefit.title || benefit.content) && (
                  <div
                    style={{
                      marginTop: "15px",
                      padding: "15px",
                      background: "#f9f9f9",
                      borderRadius: "4px",
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    <h5 style={{ margin: "0 0 10px 0", color: "#666" }}>
                      {__("Preview:", "real-assignment")}
                    </h5>
                    <div>
                      {benefit.title && <h4 style={{ margin: "0 0 5px 0" }}>{benefit.title}</h4>}
                      {benefit.content && (
                        <div
                          style={{ margin: "0", fontSize: "14px" }}
                          dangerouslySetInnerHTML={{ __html: benefit.content }}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
