import {rollSkillTemplate} from '../roll-skill-template.js';

describe('RollSkillTemplate', () => {
  it('returns options normally', () => {
    const skill = {
      relevantAttributes: [
        'strength',
        'dexterity',
      ],
    };

    const expectedTemplate = `
    <div class="form-group">
      <label for="attribute">Choose Attribute</label>
      <select name="attribute">
        <option value='strength'>strength</option>
<option value='dexterity'>dexterity</option>
        <option value='no-attribute'>None</option>
      </select>
    </div>
    `;

    const template = rollSkillTemplate(skill);
    expect(template.trim()).toBe(expectedTemplate.trim());
  });
});
