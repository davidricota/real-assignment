import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText, MediaUpload } from "@wordpress/block-editor";
import { useState } from "@wordpress/element";

export default function Edit({ attributes, setAttributes }) {
  const {
    title = "",
    subtitle = "",
    imageUrl = "",
    imageId = null,
    imageCaption = "",
    tiers = [],
    subcontentTitle = "",
    subcontent = "",
  } = attributes;
  const [localTiers, setLocalTiers] = useState(tiers);

  const addTier = () => {
    const newTier = {
      id: Date.now(),
      percentage: "",
      description: "",
      agents: "",
    };
    const updatedTiers = [...localTiers, newTier];
    setLocalTiers(updatedTiers);
    setAttributes({ tiers: updatedTiers });
  };

  const removeTier = (index) => {
    const updatedTiers = localTiers.filter((_, i) => i !== index);
    setLocalTiers(updatedTiers);
    setAttributes({ tiers: updatedTiers });
  };

  const updateTier = (index, field, value) => {
    const updatedTiers = [...localTiers];
    updatedTiers[index] = { ...updatedTiers[index], [field]: value };
    setLocalTiers(updatedTiers);
    setAttributes({ tiers: updatedTiers });
  };

  return (
    <div {...useBlockProps()}>
      <div style={{ padding: "20px", border: "1px dashed #ccc" }}>
        <h3>{__("Legacy Block", "real-assignment")}</h3>

        {/* Title */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            {__("Title", "real-assignment")}
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setAttributes({ title: e.target.value })}
            placeholder={__("Enter title...", "real-assignment")}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Subtitle */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            {__("Subtitle", "real-assignment")}
          </label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setAttributes({ subtitle: e.target.value })}
            placeholder={__("Enter subtitle...", "real-assignment")}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Image */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            {__("Image", "real-assignment")}
          </label>
          <MediaUpload
            onSelect={(media) => {
              setAttributes({
                imageUrl: media.url,
                imageId: media.id,
              });
            }}
            allowedTypes={["image"]}
            value={imageId}
            render={({ open }) => (
              <div>
                {imageUrl ? (
                  <div>
                    <img
                      src={imageUrl}
                      alt={title || "Legacy"}
                      style={{
                        width: "200px",
                        height: "auto",
                        borderRadius: "4px",
                        marginBottom: "10px",
                      }}
                    />
                    <div>
                      <button
                        onClick={open}
                        style={{
                          background: "#007cba",
                          color: "white",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          marginRight: "5px",
                        }}
                      >
                        {__("Change Image", "real-assignment")}
                      </button>
                      <button
                        onClick={() => {
                          setAttributes({ imageUrl: "", imageId: null });
                        }}
                        style={{
                          background: "#dc3232",
                          color: "white",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        {__("Remove", "real-assignment")}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={open}
                    style={{
                      background: "#007cba",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    {__("Select Image", "real-assignment")}
                  </button>
                )}
              </div>
            )}
          />
        </div>

        {/* Image Caption */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            {__("Image Caption", "real-assignment")}
          </label>
          <input
            type="text"
            value={imageCaption}
            onChange={(e) => setAttributes({ imageCaption: e.target.value })}
            placeholder={__("Enter image caption...", "real-assignment")}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Tiers Repeater */}
        <div style={{ marginBottom: "20px" }}>
          <h4>{__("Tiers", "real-assignment")}</h4>
          <button
            onClick={addTier}
            style={{
              background: "#007cba",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
              marginBottom: "15px",
            }}
          >
            {__("Add Tier", "real-assignment")}
          </button>

          {localTiers.length === 0 ? (
            <p>{__("No tiers added yet. Click 'Add Tier' to get started.", "real-assignment")}</p>
          ) : (
            <div>
              {localTiers.map((tier, index) => (
                <div
                  key={tier.id}
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
                    <h5>
                      {__("Tier", "real-assignment")} {index + 1}
                    </h5>
                    <button
                      onClick={() => removeTier(index)}
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

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 2fr",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <input
                      type="number"
                      placeholder={__("Percentage", "real-assignment")}
                      value={tier.percentage || ""}
                      onChange={(e) => updateTier(index, "percentage", e.target.value)}
                      style={{
                        padding: "8px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                      }}
                    />
                    <input
                      type="text"
                      placeholder={__("Description", "real-assignment")}
                      value={tier.description || ""}
                      onChange={(e) => updateTier(index, "description", e.target.value)}
                      style={{
                        padding: "8px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                      }}
                    />
                  </div>

                  <input
                    type="text"
                    placeholder={__("Agents", "real-assignment")}
                    value={tier.agents || ""}
                    onChange={(e) => updateTier(index, "agents", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Subcontent Title */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            {__("Subcontent Title", "real-assignment")}
          </label>
          <input
            type="text"
            value={subcontentTitle}
            onChange={(e) => setAttributes({ subcontentTitle: e.target.value })}
            placeholder={__("Enter subcontent title...", "real-assignment")}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Subcontent */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            {__("Subcontent (WYSIWYG)", "real-assignment")}
          </label>
          <RichText
            tagName="div"
            value={subcontent}
            onChange={(value) => setAttributes({ subcontent: value })}
            placeholder={__("Enter subcontent...", "real-assignment")}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              minHeight: "100px",
            }}
          />
        </div>

        {/* Preview */}
        {(title ||
          subtitle ||
          imageUrl ||
          localTiers.length > 0 ||
          subcontentTitle ||
          subcontent) && (
          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              background: "#f9f9f9",
              borderRadius: "4px",
              border: "1px solid #e0e0e0",
            }}
          >
            <h5 style={{ margin: "0 0 15px 0", color: "#666" }}>
              {__("Preview:", "real-assignment")}
            </h5>
            <div>
              {title && <h2 style={{ margin: "0 0 10px 0" }}>{title}</h2>}
              {subtitle && <h3 style={{ margin: "0 0 15px 0", color: "#666" }}>{subtitle}</h3>}
              {imageUrl && (
                <div style={{ marginBottom: "15px" }}>
                  <img
                    src={imageUrl}
                    alt={title || "Legacy"}
                    style={{ maxWidth: "100%", height: "auto", borderRadius: "4px" }}
                  />
                  {imageCaption && (
                    <p
                      style={{
                        margin: "5px 0 0 0",
                        fontSize: "14px",
                        color: "#666",
                        fontStyle: "italic",
                      }}
                    >
                      {imageCaption}
                    </p>
                  )}
                </div>
              )}
              {localTiers.length > 0 && (
                <div style={{ marginBottom: "15px" }}>
                  <h4 style={{ margin: "0 0 10px 0" }}>{__("Tiers:", "real-assignment")}</h4>
                  {localTiers.map((tier, index) => (
                    <div
                      key={tier.id}
                      style={{
                        marginBottom: "8px",
                        padding: "8px",
                        background: "#fff",
                        borderRadius: "4px",
                      }}
                    >
                      <strong>{tier.percentage}%</strong> - {tier.description}
                      {tier.agents && (
                        <div style={{ fontSize: "12px", color: "#666" }}>Agents: {tier.agents}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {(subcontentTitle || subcontent) && (
                <div
                  style={{
                    marginTop: "15px",
                    padding: "15px",
                    background: "#f8f9fa",
                    borderRadius: "4px",
                  }}
                >
                  {subcontentTitle && (
                    <h4 style={{ margin: "0 0 10px 0", color: "#333" }}>{subcontentTitle}</h4>
                  )}
                  {subcontent && (
                    <div
                      style={{ fontSize: "14px" }}
                      dangerouslySetInnerHTML={{ __html: subcontent }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
