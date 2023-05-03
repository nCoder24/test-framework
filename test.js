const style = require("./style.js");
const compare = require("./compare.js");
const assertionLog = [];

const pushAssertion = function(fnName, actual, expected, message, isAssertionPassed) {
  assertionLog.push({fnName, actual, expected, message, isAssertionPassed});
}

const generateTestReport = function(isAssertionPassed, actual, expected, message) {
  const reportLines = [];

  reportLines.push((isAssertionPassed ? style.green("󰗡 ") : style.red(" ")) + message); 
  if(!isAssertionPassed) {
    reportLines.push(style.green("   expected: " + expected));
    reportLines.push(style.red("    actutal: " + actual));
  }

  return reportLines.join("\n");
}

const groupObjects = function(listOfObjects, key) {
  const groupedObject = {};

  for(const object of listOfObjects) {
    const groupKey = object[key];
    groupedObject[groupKey] = (groupedObject[groupKey] || []).concat(object);
  }

  return groupedObject;
}

const generateSummaryLine = function(assertions) {
  const totalCount = assertions.length;
  const passedCount = (groupObjects(assertions, "isAssertionPassed").true || []).length;

  return passedCount + "/" + totalCount + " passed";
}

const generateReports = function(assertions) {
  const reports = [];

  for(const assertion of assertions) {
    reports.push(generateTestReport(
      assertion.isAssertionPassed, 
      assertion.actual, 
      assertion.expected, 
      assertion.message
    ));
  }

  return reports.join("\n");
}

const generateGroupeTitle = function(assertions, message) {
  return style.headline(
    message + " (" + generateSummaryLine(assertions) + ")");
}

const generateGroupedReport = function(groupHeadline, assertions) {
  return groupHeadline + generateReports(assertions)
}

const generateGroupedByFnNameReport = function() {
  const allReports = [];
  const assertions = groupObjects(assertionLog, "fnName");

  for(const fnName in assertions) {
    const groupTitle = generateGroupeTitle(assertions[fnName], fnName);
    allReports.push(generateGroupedReport(groupTitle, assertions[fnName]));
  }

  return allReports.join("\n");
}

const generateReport = function() {
  const summary = style.bold("\nSummary : " + generateSummaryLine(assertionLog));

  return generateGroupedByFnNameReport() + 
    "\n" +
    summary;
}

const assert = function(fnName, comparator = compare.isEqual, actual, expected, message) {
  const isAssertionPassed = comparator(actual, expected);

  pushAssertion(
    fnName,
    actual,
    expected,
    message,
    isAssertionPassed
  );
}

const it = function(message, testData) {
  assert(
    testData.fnName, 
    testData.comparator, 
    testData.actual, 
    testData.expected, 
    message
  );
}

it("should be failed", {
  fnName: "test",
  comparator: compare.areEqual,
  actual: "this",
  expected: "that"
});

console.log(generateReport());

exports.it = it;
