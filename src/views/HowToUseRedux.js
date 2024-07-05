import React from 'react'
import CodeBlock from '@component/CodeBlock'

const HowToUseRedux = () => {
    const codeString = `
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataStart, fetchDataSuccess, fetchDataFailure } from '@store'

const dispatch = useDispatch()
const data = useSelector((state) => state.example.data)
const loading = useSelector((state) => state.example.loading)

const updateData = async () => {
    dispatch(fetchDataStart())
    try {
        dispatch(fetchDataSuccess('test data'))
        message.success('Data updated successfully!')
    } catch (error) {
        dispatch(fetchDataFailure())
        message.error('Failed to update data.')
    }
}
`
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CodeBlock codeString={codeString} />
        </div>
    )
}

export default HowToUseRedux
