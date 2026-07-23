var outDir = new Folder("C:/Users/steve/OneDrive/Documents/Pawly App/img/logoset");
app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;
var logFile = new File(outDir.fsName + "/_illustrator_export.log");
logFile.open("w");
function log(message) {
  logFile.writeln(new Date().toString() + " " + message);
}

function isRgb(color, r, g, b) {
  if (!color || color.typename !== "RGBColor") {
    return false;
  }
  return Math.round(color.red) === r && Math.round(color.green) === g && Math.round(color.blue) === b;
}

function isLightFill(color) {
  if (!color) {
    return false;
  }
  if (color.typename === "RGBColor") {
    return color.red > 235 && color.green > 235 && color.blue > 235;
  }
  if (color.typename === "GrayColor") {
    return color.gray > 90;
  }
  return false;
}

function isGreenish(color) {
  if (!color || color.typename !== "RGBColor") {
    return false;
  }
  return color.green > 180 && color.red < 80 && color.blue < 80;
}

function makeColor(r, g, b) {
  var color = new RGBColor();
  color.red = r;
  color.green = g;
  color.blue = b;
  return color;
}

function makeCutoutsCompound(doc) {
  var selectedCount = 0;
  app.executeMenuCommand("deselectall");
  for (var i = 0; i < doc.pathItems.length; i++) {
    var item = doc.pathItems[i];
    if (!item.filled) {
      continue;
    }
    if (!isLightFill(item.fillColor)) {
      try {
        item.polarity = isGreenish(item.fillColor) ? PolarityValues.NEGATIVE : PolarityValues.POSITIVE;
      } catch (e) {}
      item.selected = true;
      selectedCount++;
    }
  }
  if (selectedCount > 1) {
    app.executeMenuCommand("compoundPath");
    if (doc.selection && doc.selection.length > 0) {
      for (var j = 0; j < doc.selection.length; j++) {
        try {
          doc.selection[j].filled = true;
          doc.selection[j].fillColor = makeColor(217, 119, 87);
          doc.selection[j].stroked = false;
        } catch (e) {}
      }
    }
  }
  app.executeMenuCommand("deselectall");
}
var names = [
  "Pawly_AppIcon_Pri",
  "Pawly_AppIcon_Sec",
  "Pawly_Wordmark_Pri",
  "Pawly_Wordmark_Simple",
  "Pawly_Logo_Pri",
  "Pawly_Logo_Stacked"
];

function saveAiAndPng(name) {
  log("start " + name);
  var svgFile = new File(outDir.fsName + "/" + name + ".ai-source.svg");
  if (!svgFile.exists) {
    svgFile = new File(outDir.fsName + "/" + name + ".svg");
  }
  var doc = app.open(svgFile);
  makeCutoutsCompound(doc);

  var aiOptions = new IllustratorSaveOptions();
  aiOptions.compatibility = Compatibility.ILLUSTRATOR16;
  aiOptions.pdfCompatible = true;
  aiOptions.compressed = true;
  doc.saveAs(new File(outDir.fsName + "/" + name + ".ai"), aiOptions);

  var pngOptions = new ExportOptionsPNG24();
  pngOptions.transparency = true;
  pngOptions.artBoardClipping = true;
  pngOptions.antiAliasing = true;
  pngOptions.horizontalScale = 100;
  pngOptions.verticalScale = 100;
  doc.exportFile(new File(outDir.fsName + "/" + name + ".png"), ExportType.PNG24, pngOptions);

  doc.close(SaveOptions.DONOTSAVECHANGES);
  log("done " + name);
}

for (var i = 0; i < names.length; i++) {
  try {
    saveAiAndPng(names[i]);
  } catch (e) {
    log("error " + names[i] + " " + e);
    throw e;
  }
}

log("complete");
logFile.close();
app.quit();
