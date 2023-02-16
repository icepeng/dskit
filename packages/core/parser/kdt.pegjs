KDT
  = "\n"* commands:Command* EOF {
    return commands;
  }

Command = Definition / Macro

Macro
  = MacroPrefix extension:ExtensionName ":" name:TokenName FUNC_OPEN params:MacroParams FUNC_CLOSE EOL {
  	return { kind: "Macro", extension, name, params };
  }

MacroParams
  = head:MacroParam? tail:(_ "," _ MacroParam)* {
  	return [head, ...tail.map(el => el[3])];
  }

MacroParam = Token / TokenName / "*" / StringLit

Definition
  = ScaleTokenDefinition
  / AliasTokenDefinition
  / CompositeTokenDefinition
  / CommentDefinition

AliasTokenDefinition
  = token:SemanticToken _ op:BindOperator _ binding:ScaleToken _ condition:Condition? EOL {
    return { kind: "SemanticTokenDefinition", token, binding, condition };
  }

CompositeTokenDefinition
  = token:SemanticToken _ property:PropertyBindOperator _ binding:ScaleToken _ condition:Condition? EOL {
    return { kind: "SemanticTokenDefinition", token, binding, property, condition };
  }

ScaleTokenDefinition
  = ColorScaleTokenDefinition
  / OpacityScaleTokenDefinition
  / FontSizeScaleTokenDefinition
  / FontWeightScaleTokenDefinition
  / LineHeightScaleTokenDefinition
  / LetterSpacingScaleTokenDefinition
  / DurationScaleTokenDefinition
  / TimingFunctionScaleTokenDefinition

ColorScaleTokenDefinition
  = token:ColorScaleToken _ op:BindOperator _ binding:ColorLit _ condition:Condition? EOL {
    return { kind: "ColorScaleTokenDefinition", token, binding, condition };
  }

OpacityScaleTokenDefinition
  = token:OpacityScaleToken _ op:BindOperator _ binding:PercentLit _ condition:Condition? EOL {
    return { kind: "OpacityScaleTokenDefinition", token, binding, condition };
  }

FontSizeScaleTokenDefinition
  = token:FontSizeScaleToken _ op:BindOperator _ binding:(PointLit / PercentLit) _ condition:Condition? EOL {
    return { kind: "FontSizeScaleTokenDefinition", token, binding, condition };
  }

FontWeightScaleTokenDefinition
  = token:FontWeightScaleToken _ op:BindOperator _ binding:FontWeightLit _ condition:Condition? EOL {
    return { kind: "FontWeightScaleTokenDefinition", token, binding, condition };
  }

LineHeightScaleTokenDefinition
  = token:LineHeightScaleToken _ op:BindOperator _ binding:(PointLit / PercentLit) _ condition:Condition? EOL {
    return { kind: "LineHeightScaleTokenDefinition", token, binding, condition };
  }

LetterSpacingScaleTokenDefinition
  = token:LetterSpacingScaleToken _ op:BindOperator _ binding:(PointLit / PercentLit) _ condition:Condition? EOL {
    return { kind: "LetterSpacingScaleTokenDefinition", token, binding, condition };
  }

DurationScaleTokenDefinition
  = token:DurationScaleToken _ op:BindOperator _ binding:MillisecondLit _ condition:Condition? EOL {
    return { kind: "DurationScaleTokenDefinition", token, binding, condition };
  }

TimingFunctionScaleTokenDefinition
  = token:TimingFunctionScaleToken _ op:BindOperator _ binding:CubicBezierLit _ condition:Condition? EOL {
    return { kind: "TimingFunctionScaleTokenDefinition", token, binding, condition };
  }

CommentDefinition
  = token:Token _ op:CommentOperator _ comment:StringLit EOL {
    return { kind: "CommentDefinition", token, comment }
  }

Token = ScaleToken / SemanticToken

SemanticToken
  = prefix:SemanticPrefix DOT group:TokenName DOT name:TokenName {
    return { kind: "SemanticToken", prefix, group, name };
  }

ScaleToken
  = ColorScaleToken
  / OpacityScaleToken
  / FontSizeScaleToken
  / FontWeightScaleToken
  / LineHeightScaleToken
  / LetterSpacingScaleToken
  / DurationScaleToken
  / TimingFunctionScaleToken

ColorScaleToken
  = prefix:(ScalePrefix / StaticPrefix) DOT target:"color" DOT name:TokenName {
    return { kind: "ColorScaleToken", prefix, target, name };
  }

OpacityScaleToken
  = prefix:(ScalePrefix / StaticPrefix) DOT target:"opacity" DOT name:TokenName {
    return { kind: "OpacityScaleToken", prefix, target, name };
  }

FontSizeScaleToken
  = prefix:(ScalePrefix / StaticPrefix) DOT target:"font-size" DOT name:TokenName {
    return { kind: "FontSizeScaleToken", prefix, target, name };
  }

FontWeightScaleToken
  = prefix:(ScalePrefix / StaticPrefix) DOT target:"font-weight" DOT name:TokenName {
    return { kind: "FontWeightScaleToken", prefix, target, name };
  }

LineHeightScaleToken
  = prefix:(ScalePrefix / StaticPrefix) DOT target:"line-height" DOT name:TokenName {
    return { kind: "LineHeightScaleToken", prefix, target, name };
  }

LetterSpacingScaleToken
  = prefix:(ScalePrefix / StaticPrefix) DOT target:"letter-spacing" DOT name:TokenName {
    return { kind: "LetterSpacingScaleToken", prefix, target, name };
  }

DurationScaleToken
  = prefix:(ScalePrefix / StaticPrefix) DOT target:"duration" DOT name:TokenName {
    return { kind: "DurationScaleToken", prefix, target, name };
  }

TimingFunctionScaleToken
  = prefix:(ScalePrefix / StaticPrefix) DOT target:"timing-function" DOT name:TokenName {
    return { kind: "TimingFunctionScaleToken", prefix, target, name };
  }

Condition
  = FUNC_OPEN condition:(TokenName / "*") FUNC_CLOSE {
    return condition;
  }

TokenName
  = [a-z][a-z0-9]+ ("-" [a-z0-9]+)* {
    return text();
  }

ExtensionName
  = [a-zA-Z][a-zA-Z0-9]+ {
    return text();
  }

ComponentPrefix
  = "$component"

SemanticPrefix
  = "$semantic"

ScalePrefix
  = "$scale"

StaticPrefix
  = "$static"

MacroPrefix
  = "%"

// operators

BindOperator
  = "->"

PropertyBindOperator
  = "-[:" property:TokenName "]>" {
    return property;
  }

CommentOperator
  = "#>"

// literals

ColorLit
  = ColorHexLit
  / ColorRgbaLit
  / ColorRgbLit

ColorHexLit "hex"
  = "#" code:HEXDIG+ {
    switch (code.length) {
      case 3:
      case 4:
      case 6:
      case 8:
        return { kind: 'ColorHexLit', value: text() };
    }
    error('Invalid color code: ' + text());
  }

ColorRgbLit "rgb()"
  = "rgb" FUNC_OPEN _ r:INTEGER _ SEP _ g:INTEGER _ SEP _ b:INTEGER _ FUNC_CLOSE {
    if (r < 0 || r > 255) error('Invalid value must be 0 ~ 255, but got ' + r);
    if (g < 0 || g > 255) error('Invalid value must be 0 ~ 255, but got ' + g);
    if (b < 0 || b > 255) error('Invalid value must be 0 ~ 255, but got ' + b);
    return { kind: 'ColorRgbLit', r, g, b };
  }

ColorRgbaLit "rgba()"
  = "rgba" FUNC_OPEN _ r:INTEGER _ SEP _ g:INTEGER _ SEP _ b:INTEGER _ SEP _ a:NUMBER _ FUNC_CLOSE {
    if (r < 0 || r > 255) error('Invalid color code: value must be 0 ~ 255, but got ' + r);
    if (g < 0 || g > 255) error('Invalid color code: value must be 0 ~ 255, but got ' + g);
    if (b < 0 || b > 255) error('Invalid color code: value must be 0 ~ 255, but got ' + b);
    if (a < 0 || a > 1) error('Invalid color code: alpha must be 0.0 ~ 1.0, but got ' + a.toFixed(1));
    return { kind: 'ColorRgbaLit', r, g, b, a };
  }

FontWeightLit
  = value: ("thin" / "regular" / "bold") {
    return { kind: 'FontWeightLit', value }
  }

PointLit "point"
  = value:NUMBER "pt" {
    return { kind: 'PointLit', value };
  }

PercentLit "percent"
  = value:NUMBER "%" {
    return { kind: 'PercentLit', value };
  }

MillisecondLit
  = value:NUMBER "ms" {
    return { kind: 'MillisecondLit', value };
  }

CubicBezierLit "cubic-bezier()"
  = "cubic-bezier" FUNC_OPEN _ p0:NUMBER _ SEP _ p1:NUMBER _ SEP _ p2:NUMBER _ SEP _ p3:NUMBER _ FUNC_CLOSE {
    if (p0 < 0 || p0 > 1) error('Invalid p0: value must be 0 ~ 1, but got ' + p0);
    if (p2 < 0 || p2 > 1) error('Invalid p2: value must be 0 ~ 1, but got ' + p2);
    return { kind: 'CubicBezierLit', p0, p1, p2, p3 }
  }

StringLit "quoted string"
  = DoubleQuotedStringLit
  / SingleQuotedStringLit

DoubleQuotedStringLit
  = '"' chars:([^\n\r\f"])* '"' {
  	return chars.join('');
  }

SingleQuotedStringLit
  = "'" chars:([^\n\r\f'])* "'" {
  	return chars.join('');
  }

// macros

FUNC_OPEN "function opening ("
  = "("

FUNC_CLOSE "function closing )"
  = ")"

HEXDIG "hexadecimal"
  = [0-9a-fA-F]

NUMBER "number"
  = INTEGER ("." [0-9]+)? (("e" / "E") ("+" / "-")? [0-9]+)? {
    return parseFloat(text());
  }

INTEGER "integer"
  = "-"? ("0" / ([1-9] [0-9]*)) {
    return parseInt(text())
  }

DOT
  = "."

SEP "comma"
  = ","

EOL "end of line"
  = ";"? "\n"*

EOF "end of file"
  = "\n"*

_ "space"
  = " "*