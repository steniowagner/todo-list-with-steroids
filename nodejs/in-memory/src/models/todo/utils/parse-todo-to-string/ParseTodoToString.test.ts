import { ParseTodoToString } from "./ParseTodoToString";
import { Status } from "../../Status";

const statuses = [Status.TODO, Status.DOING, Status.DONE];
const statusesValues = ["Todo", "Doing", "Done"];
const baseParams = {
  description: "SOME_DESCRIPTION",
  id: "SOME_ID",
};

describe("Todo/ParseTodoToString", () => {
  describe("When only the default params are presented", () => {
    it('should parse correctly when "isFinished" is "true"', () => {
      expect(
        ParseTodoToString.parse({
          ...baseParams,
          isFinished: true,
        })
      ).toEqual(
        `- id: ${baseParams.id}\n- Description: ${baseParams.description}\n- Finished? Yes\n- Status: Unknown`
      );
    });

    it('should parse correctly when "isFinished" is "false"', () => {
      expect(
        ParseTodoToString.parse({
          ...baseParams,
          isFinished: false,
        })
      ).toEqual(
        `- id: ${baseParams.id}\n- Description: ${baseParams.description}\n- Finished? No\n- Status: Unknown`
      );
    });
  });

  describe('When the "Status" is defined', () => {
    it("should parse correctly", () => {
      statuses.forEach((status, index) => {
        expect(
          ParseTodoToString.parse({
            ...baseParams,
            isFinished: false,
            status,
          })
        ).toEqual(
          `- id: ${baseParams.id}\n- Description: ${baseParams.description}\n- Finished? No\n- Status: ${statusesValues[index]}`
        );
      });
    });
  });
});
