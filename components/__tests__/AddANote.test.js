import { mount, flushPromises } from "@vue/test-utils";
import AddANote from "../AddANote.vue";
import { expect } from "vitest";
import axios from "axios";
import { SINGLE_REPORT_MOCK } from "../../utils/mocks";
import { NOTE_MESSAGES } from "../../utils/constants";
import { VueQueryPlugin } from "@tanstack/vue-query";

let wrapper;

const createComponent = ({ props = {}, shallow = false } = {}) => {
  wrapper = mount(AddANote, {
    props,
    shallow,
    global: {
      plugins: [VueQueryPlugin],
    },
  });
};

const currentPkg = SINGLE_REPORT_MOCK.suggestions[1];
const getSummary = () => wrapper.find("summary");
const getTextarea = () => wrapper.find("textarea");

describe("AddANote component", () => {
  const axiosPut = vi.spyOn(axios, "put");
  beforeEach(async () => {
    createComponent({
      props: {
        name: currentPkg.name,
      },
    });
    await flushPromises();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    wrapper.unmount();
    wrapper = null;
  });

  it("mounts and shows empty textarea", async () => {
    expect(getSummary().text()).toContain(NOTE_MESSAGES.empty);

    await getSummary().trigger("click");

    expect(getTextarea().value).toBeUndefined();

    await getTextarea().setValue("a comment");
    await wrapper.find("button").trigger("click");
    expect(axiosPut).toHaveBeenCalledWith("/api/reports/678", {
      ...SINGLE_REPORT_MOCK.state,
      [currentPkg.name]: {
        ...SINGLE_REPORT_MOCK.state[currentPkg.name],
        note: "a comment",
      },
    });
  });

  it("uses default value", async () => {
    await wrapper.setProps({
      name: SINGLE_REPORT_MOCK.suggestions[0].name,
    });
    expect(getSummary().text()).toBe(NOTE_MESSAGES.filled);
  });

  it("triggers re render on pkg change", async () => {
    expect(getSummary().text()).toBe(NOTE_MESSAGES.empty);

    await wrapper.setProps({
      name: SINGLE_REPORT_MOCK.suggestions[0].name,
    });
    expect(getSummary().text()).toBe(NOTE_MESSAGES.filled);
  });
});
