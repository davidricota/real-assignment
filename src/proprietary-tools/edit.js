import { __ } from "@wordpress/i18n";
import { useBlockProps, MediaUpload } from "@wordpress/block-editor";
import { useState } from "@wordpress/element";

export default function Edit({ attributes, setAttributes }) {
  console.log("Edit component loaded!");
  console.log("Initial attributes:", attributes);

  const { tools = [] } = attributes;
  const [localTools, setLocalTools] = useState(tools);

  const addTool = () => {
    const newTool = {
      id: Date.now(),
      title: "",
      content: "",
      imageUrl: "",
      imageId: null,
    };
    const updatedTools = [...localTools, newTool];
    setLocalTools(updatedTools);
    setAttributes({ tools: updatedTools });
  };

  const removeTool = (index) => {
    const updatedTools = localTools.filter((_, i) => i !== index);
    setLocalTools(updatedTools);
    setAttributes({ tools: updatedTools });
  };

  const updateTool = (index, field, value) => {
    console.log(`updateTool called: index=${index}, field=${field}, value=`, value);
    const updatedTools = [...localTools];
    updatedTools[index] = { ...updatedTools[index], [field]: value };
    console.log(`Updated tool ${index}:`, updatedTools[index]);
    setLocalTools(updatedTools);
    setAttributes({ tools: updatedTools });
  };

  return (
    <div {...useBlockProps()}>
      <div style={{ padding: "20px", border: "1px dashed #ccc" }}>
        <h3>{__("Tools Repeater", "real-assignment")}</h3>

        <button
          onClick={() => {
            console.log("Add Tool button clicked!");
            addTool();
          }}
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
          {__("Add Tool", "real-assignment")}
        </button>

        {localTools.length === 0 ? (
          <p>{__("No tools added yet. Click 'Add Tool' to get started.", "real-assignment")}</p>
        ) : (
          <div>
            {localTools.map((tool, index) => (
              <div
                key={tool.id}
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
                  <h4>{tool.title || __("Untitled Tool", "real-assignment")}</h4>
                  <button
                    onClick={() => removeTool(index)}
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
                  placeholder={__("Tool title", "real-assignment")}
                  value={tool.title || ""}
                  onChange={(e) => updateTool(index, "title", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginBottom: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />

                <textarea
                  placeholder={__("Tool description", "real-assignment")}
                  value={tool.content || ""}
                  onChange={(e) => updateTool(index, "content", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    minHeight: "80px",
                    marginBottom: "10px",
                  }}
                />

                <div style={{ marginBottom: "10px" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                    {__("Image", "real-assignment")}
                  </label>
                  <MediaUpload
                    onSelect={(media) => {
                      console.log("Media selected:", media);
                      console.log("Media URL:", media.url);
                      console.log("Media ID:", media.id);

                      // Actualizar ambos campos en una sola operación
                      const updatedTools = [...localTools];
                      updatedTools[index] = {
                        ...updatedTools[index],
                        imageUrl: media.url,
                        imageId: media.id,
                      };
                      console.log("Updated tool:", updatedTools[index]);
                      setLocalTools(updatedTools);
                      setAttributes({ tools: updatedTools });
                    }}
                    allowedTypes={["image"]}
                    value={tool.imageId}
                    render={({ open }) => (
                      <div>
                        {tool.imageUrl ? (
                          <div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "15px",
                                marginBottom: "10px",
                              }}
                            >
                              <img
                                src={tool.imageUrl}
                                alt={tool.title || "Tool"}
                                style={{
                                  width: "120px",
                                  height: "120px",
                                  objectFit: "cover",
                                  borderRadius: "4px",
                                  border: "1px solid #ddd",
                                }}
                              />
                              <div style={{ flex: 1 }}>
                                <p
                                  style={{ margin: "0 0 10px 0", fontSize: "12px", color: "#666" }}
                                >
                                  <strong>Preview:</strong> {tool.title || "Untitled Tool"}
                                </p>
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
                                      fontSize: "12px",
                                    }}
                                  >
                                    {__("Change", "real-assignment")}
                                  </button>
                                  <button
                                    onClick={() => {
                                      updateTool(index, "imageUrl", "");
                                      updateTool(index, "imageId", null);
                                    }}
                                    style={{
                                      background: "#dc3232",
                                      color: "white",
                                      border: "none",
                                      padding: "6px 12px",
                                      borderRadius: "4px",
                                      cursor: "pointer",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {__("Remove", "real-assignment")}
                                  </button>
                                </div>
                              </div>
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

                {/* Preview del contenido final */}
                {(tool.title || tool.content || tool.imageUrl) && (
                  <div
                    style={{
                      marginTop: "15px",
                      padding: "15px",
                      background: "#f9f9f9",
                      borderRadius: "4px",
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    <h5 style={{ margin: "0 0 10px 0", color: "#666" }}>Preview:</h5>
                    <div style={{ display: "flex", gap: "15px", alignItems: "flex-start" }}>
                      {tool.imageUrl && (
                        <img
                          src={tool.imageUrl}
                          alt={tool.title || "Tool"}
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                            borderRadius: "4px",
                          }}
                        />
                      )}
                      <div style={{ flex: 1 }}>
                        {tool.title && <h4 style={{ margin: "0 0 5px 0" }}>{tool.title}</h4>}
                        {tool.content && (
                          <p style={{ margin: "0", fontSize: "14px" }}>{tool.content}</p>
                        )}
                      </div>
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
