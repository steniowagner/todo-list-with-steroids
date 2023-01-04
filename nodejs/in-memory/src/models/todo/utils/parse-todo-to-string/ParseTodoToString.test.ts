import { ParseTodoToString } from "./ParseTodoToString";
import { Priority } from "../../Priority";
import { Status } from "../../Status";

const priorities = [Priority.LOW, Priority.MEDIUM, Priority.HIGH];
const prioritiesValues = ["Low", "Medium", "High"];
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
        `- id: ${baseParams.id}\n- Description: ${baseParams.description}\n- Finished? Yes\n- Priority: Unknown\n- Status: Unknown\n`
      );
    });

    it('should parse correctly when "isFinished" is "false"', () => {
      expect(
        ParseTodoToString.parse({
          ...baseParams,
          isFinished: false,
        })
      ).toEqual(
        `- id: ${baseParams.id}\n- Description: ${baseParams.description}\n- Finished? No\n- Priority: Unknown\n- Status: Unknown\n`
      );
    });
  });

  describe('When the "Priority" is defined', () => {
    it("should parse correctly", () => {
      priorities.forEach((priority, index) => {
        expect(
          ParseTodoToString.parse({
            ...baseParams,
            isFinished: false,
            priority,
          })
        ).toEqual(
          `- id: ${baseParams.id}\n- Description: ${baseParams.description}\n- Finished? No\n- Priority: ${prioritiesValues[index]}\n- Status: Unknown\n`
        );
      });
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
          `- id: ${baseParams.id}\n- Description: ${baseParams.description}\n- Finished? No\n- Priority: Unknown\n- Status: ${statusesValues[index]}\n`
        );
      });
    });
  });

  describe('When both "Status" and "Priorty" are defined', () => {
    it("should parse correctly", () => {
      for (let i = 0; i < statuses.length; i++) {
        for (let j = 0; j < priorities.length; j++) {
          expect(
            ParseTodoToString.parse({
              ...baseParams,
              isFinished: false,
              status: statuses[i],
              priority: priorities[j],
            })
          ).toEqual(
            `- id: ${baseParams.id}\n- Description: ${baseParams.description}\n- Finished? No\n- Priority: ${prioritiesValues[j]}\n- Status: ${statusesValues[i]}\n`
          );
        }
      }
    });
  });
});
