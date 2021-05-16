import cx from 'classnames';
import { ListState } from "@react-stately/list";
import { MenuTriggerState } from '@react-stately/menu';
import { useSelectState } from '@react-stately/select';
import { useButton } from '@react-aria/button';
import { FocusScope } from '@react-aria/focus';
import { useFocus } from '@react-aria/interactions';
import { AriaListBoxOptions, useListBox, useOption } from '@react-aria/listbox';
import { useOverlay, DismissButton } from '@react-aria/overlays';
import { AriaSelectOptions, HiddenSelect, useSelect } from '@react-aria/select';
import { mergeProps } from '@react-aria/utils';
import { Node } from '@react-types/shared';
import React, { useMemo, useRef, useState } from 'react';
import { Button } from './Button';

type DropDownProps = AriaSelectOptions<{}> & { name?: string };

export const DropDown = (props: DropDownProps) => {
  // Create state based on the incoming props
  const state = useSelectState(props);

  // Get props for child elements from useSelect
  const ref = useRef(null);
  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    ref
  );

  // Get props for the button based on the trigger props from useSelect
  const { buttonProps } = useButton(triggerProps, ref);

  return (
    <div className="flex flex-col">
      <div {...labelProps} className="text-gray-600 text-sm">{props.label}</div>
      <HiddenSelect
        state={state}
        triggerRef={ref}
        label={props.label}
        name={props.name}
      />
      <Button {...buttonProps} forwardRef={ref} className="flex items-center">
        <span {...valueProps}>
          {state.selectedItem
            ? state.selectedItem.rendered
            : 'Select an option'}
        </span>
        <span aria-hidden="true" className="text-xs pl-2">▼</span>
      </Button>
      {state.isOpen && <ListBoxPopup {...menuProps} state={state} />}
    </div>
  );
}

type ListBoxPopupProps<T> = AriaListBoxOptions<T> & { state: MenuTriggerState & ListState<T> };

const ListBoxPopup = ({ state, ...otherProps }: ListBoxPopupProps<{}>) => {
  const ref = useRef(null);

  // Get props for the listbox
  const { listBoxProps } = useListBox(
    {
      autoFocus: state.focusStrategy || true,
      disallowEmptySelection: true,
      ...otherProps
    },
    state,
    ref
  );

  // Handle events that should cause the popup to close,
  // e.g. blur, clicking outside, or pressing the escape key.
  const overlayRef = useRef(null);
  const { overlayProps } = useOverlay(
    {
      onClose: () => state.close(),
      shouldCloseOnBlur: true,
      isOpen: state.isOpen,
      isDismissable: true
    },
    overlayRef
  );

  // Wrap in <FocusScope> so that focus is restored back to the
  // trigger when the popup is closed. In addition, add hidden
  // <DismissButton> components at the start and end of the list
  // to allow screen reader users to dismiss the popup easily.
  return (
    <FocusScope restoreFocus>
      <div {...overlayProps} ref={overlayRef}>
        <DismissButton onDismiss={() => state.close()} />
        <ul
          {...mergeProps(listBoxProps, otherProps)}
          ref={ref}
          className="absolute mt-1 list-none border rounded border-gray-400 bg-white shadow-lg"
        >
          {[...state.collection].map((item) => (
            <Option key={item.key} item={item} state={state} />
          ))}
        </ul>
        <DismissButton onDismiss={() => state.close()} />
      </div>
    </FocusScope>
  );
}

type OptionProps<T> = { item: Node<T>, state: ListState<T> };

const Option = ({ item, state }: OptionProps<{}>) => {
  // Get props for the option element
  const ref = useRef(null);
  const isDisabled = useMemo(() => state.disabledKeys.has(item.key), [state, item]);
  const isSelected = useMemo(() => state.selectionManager.isSelected(item.key), [state, item]);
  const { optionProps } = useOption(
    {
      key: item.key,
      isDisabled,
      isSelected,
      shouldSelectOnPressUp: true,
      shouldFocusOnHover: true
    },
    state,
    ref
  );

  // Handle focus events so we can apply highlighted
  // style to the focused option
  const [isFocused, setFocused] = useState(false);
  const { focusProps } = useFocus({ onFocusChange: setFocused });

  return (
    <li
      {...mergeProps(optionProps, focusProps)}
      ref={ref}
      className={cx(
        'focus:outline-none cursor-pointer w-full py-1 px-2',
        isSelected && 'bg-blue-500 text-white',
        isFocused && 'bg-gray-300'
      )}
    >
      {item.rendered}
    </li>
  );
}
