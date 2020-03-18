/*
import createFieldProps from '../createFieldProps'
import plain from '../structure/plain'
import plainExpectations from '../structure/plain/__tests__/expectations'
import immutable from '../structure/immutable'
import immutableExpectations from '../structure/immutable/__tests__/expectations'

import tmp from 'tmp'

const describeCreateFieldProps = (name, structure, setup) => {
  const { empty, getIn, fromJS, toJS, deepEqual } = structure

  describe(name, () => {
    beforeAll(() => {
      setup()
    })

    it('should pass value through', () => {
      expect(
        createFieldProps({ getIn, toJS, deepEqual }, 'foo', { value: 'hello' })
          .input.value
      ).toBe('hello')
    })

    it('should pass dirty/pristine through', () => {
      expect(
        createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
          dirty: false,
          pristine: true
        }).meta.dirty
      ).toBe(false)
      expect(
        createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
          dirty: false,
          pristine: true
        }).meta.pristine
      ).toBe(true)
      expect(
        createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
          dirty: true,
          pristine: false
        }).meta.dirty
      ).toBe(true)
      expect(
        createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
          dirty: true,
          pristine: false
        }).meta.pristine
      ).toBe(false)
    })

    it('should pass initial value through', () => {
      expect(
        createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
          initial: 'hello'
        }).meta.initial
      ).toBe('hello')
    })

    it('should provide onBlur', () => {
      const onBlur = jest.fn()
      expect(onBlur).not.toHaveBeenCalled()
      const result = createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
        value: 'bar',
        onBlur
      })
      expect(typeof result.input.onBlur).toBe('function')
      expect(onBlur).not.toHaveBeenCalled()
      result.input.onBlur('rabbit')
      expect(onBlur).toHaveBeenCalledWith('rabbit')
    })

    it('should provide onChange', () => {
      const onChange = jest.fn()
      expect(onChange).not.toHaveBeenCalled()
      const result = createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
        value: 'bar',
        onChange
      })
      expect(typeof result.input.onChange).toBe('function')
      expect(onChange).not.toHaveBeenCalled()
      result.input.onChange('rabbit')
      expect(onChange).toHaveBeenCalledWith('rabbit')
    })

    it('should provide onFocus', () => {
      const onFocus = jest.fn()
      expect(onFocus).not.toHaveBeenCalled()
      const result = createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
        value: 'bar',
        onFocus
      })
      expect(typeof result.input.onFocus).toBe('function')
      expect(onFocus).not.toHaveBeenCalled()
      result.input.onFocus('rabbit')
      expect(onFocus).toHaveBeenCalled()
    })

    it('should provide onDragStart', () => {
      const onDragStart = jest.fn()
      const result = createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
        value: 'bar',
        onDragStart
      })
      expect(typeof result.input.onDragStart).toBe('function')
    })

    it('should provide onDrop', () => {
      const onDrop = jest.fn()
      const result = createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
        value: 'bar',
        onDrop
      })
      expect(typeof result.input.onDrop).toBe('function')
    })

    it('should read active from state', () => {
      const inactiveResult = createFieldProps(
        { getIn, toJS, deepEqual },
        'foo',
        {
          value: 'bar',
          state: empty
        }
      )
      expect(inactiveResult.meta.active).toBe(false)
      const activeResult = createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
        value: 'bar',
        state: fromJS({
          active: true
        })
      })
      expect(activeResult.meta.active).toBe(true)
    })

    it('should pass along submitting flag', () => {
      const notSubmittingResult = createFieldProps(
        { getIn, toJS, deepEqual },
        'foo',
        {
          value: 'bar'
        }
      )
      expect(notSubmittingResult.meta.submitting).toBe(false)
      const submittingResult = createFieldProps(
        { getIn, toJS, deepEqual },
        'foo',
        {
          value: 'bar',
          submitting: true
        }
      )
      expect(submittingResult.meta.submitting).toBe(true)
    })

    it('should pass along submitFailed flag', () => {
      const notFailedResult = createFieldProps(
        { getIn, toJS, deepEqual },
        'foo',
        {
          value: 'bar'
        }
      )
      expect(notFailedResult.meta.submitFailed).toBe(false)
      const failedResult = createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
        value: 'bar',
        submitFailed: true
      })
      expect(failedResult.meta.submitFailed).toBe(true)
    })

    it('should pass along all custom state props', () => {
      const pristineResult = createFieldProps(
        { getIn, toJS, deepEqual },
        'foo',
        {
          value: 'bar'
        }
      )
      expect(pristineResult.meta.customProp).toBe(undefined)
      const customResult = createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
        value: 'bar',
        state: fromJS({
          customProp: 'my-custom-prop'
        })
      })
      expect(customResult.meta.customProp).toBe('my-custom-prop')
    })

    it('should not override canonical props with custom props', () => {
      const pristineResult = createFieldProps(
        { getIn, toJS, deepEqual },
        'foo',
        {
          value: 'bar'
        }
      )
      expect(pristineResult.meta.customProp).toBe(undefined)
      const customResult = createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
        value: 'bar',
        submitting: true,
        state: fromJS({
          submitting: false
        })
      })
      expect(customResult.meta.submitting).toBe(true)
    })

    it('should read touched from state', () => {
      const untouchedResult = createFieldProps(
        { getIn, toJS, deepEqual },
        'foo',
        {
          value: 'bar',
          state: empty
        }
      )
      expect(untouchedResult.meta.touched).toBe(false)
      const touchedResult = createFieldProps(
        { getIn, toJS, deepEqual },
        'foo',
        {
          value: 'bar',
          state: fromJS({
            touched: true
          })
        }
      )
      expect(touchedResult.meta.touched).toBe(true)
    })

    it('should read visited from state', () => {
      const notVisitedResult = createFieldProps(
        { getIn, toJS, deepEqual },
        'foo',
        {
          value: 'bar',
          state: empty
        }
      )
      expect(notVisitedResult.meta.visited).toBe(false)
      const visitedResult = createFieldProps(
        { getIn, toJS, deepEqual },
        'foo',
        {
          value: 'bar',
          state: fromJS({
            visited: true
          })
        }
      )
      expect(visitedResult.meta.visited).toBe(true)
    })

    it('should read sync errors from prop', () => {
      const noErrorResult = createFieldProps(
        { getIn, toJS, deepEqual },
        'foo',
        {
          value: 'bar',
          state: empty
        }
      )
      expect(noErrorResult.meta.error).toBeFalsy()
      expect(noErrorResult.meta.valid).toBe(true)
      expect(noErrorResult.meta.invalid).toBe(false)
      const errorResult = createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
        value: 'bar',
        state: empty,
        syncError: 'This is an error'
      })
      expect(errorResult.meta.error).toBe('This is an error')
      expect(errorResult.meta.valid).toBe(false)
      expect(errorResult.meta.invalid).toBe(true)
    })

    it('should read sync warnings from prop', () => {
      const noWarningResult = createFieldProps(
        { getIn, toJS, deepEqual },
        'foo',
        {
          value: 'bar',
          state: empty
        }
      )
      expect(noWarningResult.meta.warning).toBeFalsy()
      const warningResult = createFieldProps(
        { getIn, toJS, deepEqual },
        'foo',
        {
          value: 'bar',
          state: empty,
          syncWarning: 'This is an warning'
        }
      )
      expect(warningResult.meta.warning).toBe('This is an warning')
    })

    it('should read async errors from state', () => {
      const noErrorResult = createFieldProps(
        { getIn, toJS, deepEqual },
        'foo',
        {
          value: 'bar',
          state: empty
        }
      )
      expect(noErrorResult.meta.error).toBeFalsy()
      expect(noErrorResult.meta.valid).toBe(true)
      expect(noErrorResult.meta.invalid).toBe(false)
      const errorResult = createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
        value: 'bar',
        state: empty,
        syncError: 'This is an error'
      })
      expect(errorResult.meta.error).toBe('This is an error')
      expect(errorResult.meta.valid).toBe(false)
      expect(errorResult.meta.invalid).toBe(true)
    })

    it('should read submit errors from state', () => {
      const noErrorResult = createFieldProps(
        { getIn, toJS, deepEqual },
        'foo',
        {
          value: 'bar',
          state: empty
        }
      )
      expect(noErrorResult.meta.error).toBeFalsy()
      expect(noErrorResult.meta.valid).toBe(true)
      expect(noErrorResult.meta.invalid).toBe(false)
      const errorResult = createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
        value: 'bar',
        state: empty,
        submitError: 'This is an error'
      })
      expect(errorResult.meta.error).toBe('This is an error')
      expect(errorResult.meta.valid).toBe(false)
      expect(errorResult.meta.invalid).toBe(true)
    })

    it('should prioritize sync errors over async or submit errors', () => {
      const noErrorResult = createFieldProps(
        { getIn, toJS, deepEqual },
        'foo',
        {
          value: 'bar',
          state: empty
        }
      )
      expect(noErrorResult.meta.error).toBeFalsy()
      expect(noErrorResult.meta.valid).toBe(true)
      expect(noErrorResult.meta.invalid).toBe(false)
      const errorResult = createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
        value: 'bar',
        asyncError: 'async error',
        submitError: 'submit error',
        syncError: 'sync error'
      })
      expect(errorResult.meta.error).toBe('sync error')
      expect(errorResult.meta.valid).toBe(false)
      expect(errorResult.meta.invalid).toBe(true)
    })

    it('should pass through other props', () => {
      const result = createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
        value: 'bar',
        state: empty,
        someOtherProp: 'dog',
        className: 'my-class'
      })
      expect(result.initial).toBeFalsy()
      expect(result.state).toBeFalsy()
      expect(result.custom.someOtherProp).toBe('dog')
      expect(result.custom.className).toBe('my-class')
    })

    it('should pass through other props using props prop', () => {
      const result = createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
        value: 'bar',
        state: empty,
        props: {
          someOtherProp: 'dog',
          className: 'my-class'
        }
      })
      expect(result.initial).toBeFalsy()
      expect(result.state).toBeFalsy()
      expect(result.custom.someOtherProp).toBe('dog')
      expect(result.custom.className).toBe('my-class')
    })

    it('should set checked for checkboxes', () => {
      expect(
        createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
          state: empty,
          type: 'checkbox'
        }).input.checked
      ).toBe(false)
      expect(
        createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
          value: true,
          state: empty,
          type: 'checkbox'
        }).input.checked
      ).toBe(true)
      expect(
        createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
          value: false,
          state: empty,
          type: 'checkbox'
        }).input.checked
      ).toBe(false)
    })

    it('should set checked for radio buttons', () => {
      expect(
        createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
          state: empty,
          type: 'radio',
          _value: 'bar'
        }).input.checked
      ).toBe(false)
      expect(
        createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
          value: 'bar',
          state: empty,
          type: 'radio',
          _value: 'bar'
        }).input.checked
      ).toBe(true)
      expect(
        createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
          value: 'baz',
          state: empty,
          type: 'radio',
          _value: 'bar'
        }).input.checked
      ).toBe(false)
      expect(
        createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
          state: empty,
          type: 'radio',
          _value: { randomName: 'bar' }
        }).input.checked
      ).toBe(false)
      expect(
        createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
          value: { randomName: 'bar' },
          state: empty,
          type: 'radio',
          _value: { randomName: 'bar' }
        }).input.checked
      ).toBe(true)
      expect(
        createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
          value: { randomName: 'baz' },
          state: empty,
          type: 'radio',
          _value: { randomName: 'bar' }
        }).input.checked
      ).toBe(false)
    })

    it('should default value to [] for multi-selects', () => {
      expect(
        createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
          state: empty,
          type: 'select-multiple'
        }).input.value
      ).toEqual([])
    })

    it('should default value to undefined for file inputs', () => {
      expect(
        createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
          state: empty,
          type: 'file'
        }).input.value
      ).toEqual(undefined)
    })

    it('should update value to selected file for file inputs', () => {
      let tmpFile = tmp.fileSync()
      expect(
        createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
          value: [tmpFile],
          state: empty,
          type: 'file'
        }).input.value
      ).toEqual([tmpFile])
    })

    it('should replace undefined value with empty string', () => {
      const result = createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
        state: empty
      })
      expect(result.input.value).toBe('')
    })

    it('should not format value when format prop is null', () => {
      const result = createFieldProps({ getIn, toJS, deepEqual }, 'foo', {
        state: empty,
        value: null,
        format: null
      })
      expect(result.input.value).toBe(null)
    })
  })
}

describeCreateFieldProps('createFieldProps.plain', plain, () =>
  expect.extend(plainExpectations)
)
describeCreateFieldProps('createFieldProps.immutable', immutable, () =>
  expect.extend(immutableExpectations)
)
*/
