const createTagElement = ({ rowType, rowMetaType, rowName, rowContents }) => {
  console.log("name : ", rowName, " / type : ", rowType, "/ rowMetaType : ", rowMetaType, "/ contents : ", rowContents);

  if (rowType === "meta") {
    return `<${rowType} ${rowMetaType}="${rowName}" content="${rowContents}"/>`;
  } else if (rowType === "link") {
    return `<${rowType} rel="${rowName}" href="${rowContents}"/>`;
  } else {
    return `<${rowName}>${rowContents}</${rowName}>`;
  }
}

exports.createMetaElement = (tableRows, tablePropertyList) => {
  return tableRows.reduce((acc, {properties = ''}) => {
    if (!properties) {
      return acc;
    }

    const tagElementData = {
      rowName: properties[tablePropertyList[0]][0][0] || "",
      rowType: properties[tablePropertyList[1]][0][0] || "",
      rowMetaType: properties[tablePropertyList[2]] ? properties[tablePropertyList[2]][0][0] : "",
      rowContents : properties[tablePropertyList[3]][0][0] || ""
    }

    return acc + createTagElement(tagElementData);
  }, "");
}