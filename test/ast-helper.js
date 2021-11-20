// Novel way to drive behavior of Smart Contract.

const { assert } = require("chai");

// 
const CDTYPE = "ContractDefinition";
const CNAME = "Certification";
const contractDefn = ca =>
  ca.ast.nodes.find(n => n.nodeType === CDTYPE && n.name === CNAME);

const items = (ca, structName) => {
  const item = contractDefn(ca).nodes.find((n) => n.name === structName);
  if (!item) return null;

  return item
    .members
    .map((t) => ({
      name: t.name,
      nodeType: t.nodeType,
      stateVariable: t.stateVariable,
      type: t.typeName.name,
      mutability: t.typeName.stateMutability,
    }));
};

const isDefined = members => variableName => {
  return members 
    ? members.find((item) => item.name === variableName) 
    : null;
};

const isType = members => variableName => type => {
  if (members === undefined) return false;
  const definition = members.find((item) => item.name === variableName);
  return definition && definition.type === type;
};

const isDefinedAndType = struct => varName => Type => {
    assert(
    isDefined(struct)(varName), 
    `Struct Item should have a ${varName} member`
        );
  assert(
    isType(struct)(varName)(Type), 
    `${varName} should be of Type ${Type}`
  );
};

const isPayable = members => variableName => type => {
  if (members === undefined) return false;
  const definition = members.find((item) => item.name === variableName);
  return definition && definition.type === type;
};



module.exports = {
  items,
  isDefined,
  isPayable,
  isType,
  isDefinedAndType,
};
