/* eslint-disable import/no-unresolved */
import CalendarDialog from '@/Components/CalendarDialog';
import { shallowMount } from '@vue/test-utils';

describe('Calendar Dialog : helper buttons', () => {
  const buttonHelpersClass = '.vdpr-datepicker__calendar-button-helper';
  let wrapper;

  it('should render show helper button', () => {
    wrapper = shallowMount(CalendarDialog, {
      propsData: {
        showHelperButtons: true,
      },
    });

    expect(wrapper.find(buttonHelpersClass).exists()).toBe(true);
    expect(wrapper.find(buttonHelpersClass).element.children.length).toEqual(8);
  });

  it('should not render show helper button', () => {
    wrapper = shallowMount(CalendarDialog, {
      propsData: {
        showHelperButtons: false,
      },
    });

    expect(wrapper.find(buttonHelpersClass).exists()).toBe(false);
  });

  it('should render custom helper buttons', () => {
    wrapper = shallowMount(CalendarDialog, {
      propsData: {
        helperButtons: [
          {
            name: 'Custom Button',
            from: new Date('2020 09 20'),
            to: new Date('2020 09 15'),
          },
        ],
      },
    });

    expect(wrapper.find(buttonHelpersClass).element.children.length).toEqual(1);
  });

  it('should apply date when helper button clicked', () => {
    let from = new Date('2020 08 01');
    let to = new Date('2020 08 20');

    wrapper = shallowMount(CalendarDialog);

    wrapper.vm.onHelperClick(from, to);

    expect(wrapper.vm.selectedStartDate).toEqual(from);
    expect(wrapper.vm.selectedEndDate).toEqual(to);
    expect(wrapper.vm.isAllDay).toEqual(false);

    from = new Date('2020 07 01 00:00:00');
    to = new Date('2020 07 31 23:59:59');

    wrapper.vm.onHelperClick(from, to);

    expect(wrapper.vm.isAllDay).toEqual(true);
  });
});