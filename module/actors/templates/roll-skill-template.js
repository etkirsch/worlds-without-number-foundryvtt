/**
 * rollSkillTemplate. Creates a template for use with Skill Check Dialogs.
 * Takes the skill object and populates using its parameters.
 * @param {object} skill The Skill object used to drive template generation
 * @return {html} The Skill Template for a Skill Check Dialog
 */
export function rollSkillTemplate(skill) {
  const attributeOptions = skill.relevantAttributes.map((attribute) => {
    return `<option value='${attribute}'>${attribute}</option>`;
  }).join('\n');

  return `
    <div class="form-group">
      <label for="attribute">Choose Attribute</label>
      <select name="attribute">
        ${attributeOptions}
        <option value='no-attribute'>None</option>
      </select>
    </div>
  `;
}
