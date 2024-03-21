module.exports = grammar({
  name: 'ftd',

  rules: {
    document: $ => repeat(choice(
      $.section_declaration,
      $.section_header,
      $.section_body,
      $.section_caption,
      $.subsections,
      $.section_end_marker
    )),

    section_declaration: $ => seq(
      '--', optional($.section_kind), $.section_name, ':', optional($.section_caption)
    ),

    section_kind: $ => /[^\n:]+/,

    section_name: $ => /[^\n:]+/,

    section_caption: $ => seq(
      '--', optional($.section_header_kind), $.section_name, '.caption:', optional($.section_caption_content)
    ),

    section_caption_content: $ => /[\s\S]*/,

    section_header: $ => seq(
      '--', optional($.section_header_kind), $.section_name, '.', $.section_header_key, ':', optional($.section_header_value)
    ),

    section_header_kind: $ => /[^\n.]+/,

    section_header_key: $ => /[^\n:]+/,

    section_header_value: $ => /[\s\S]*/,

    section_body: $ => seq(
      '--', $.section_name, '.body:', $.section_body_content
    ),

    section_body_content: $ => /[\s\S]*/,

    subsections: $ => seq(
      '--', 'end:', $.section_name
    ),

    section_end_marker: $ => seq(
      '--', 'end:', $.section_name, optional($.section_end_marker_value)
    ),

    section_end_marker_value: $ => /[\s\S]*/,
  }
});

