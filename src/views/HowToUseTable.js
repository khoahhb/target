import React from 'react'
import { Card, Space } from 'antd'
import CodeBlock from '@component/CodeBlock' // Đường dẫn tới component CodeBlock của bạn

const HowToUseTable = () => {
    const codeStrings = [
        {
            title: 'Table',
            code: `
import React, { useState, useEffect } from 'react'
import { Button, Space, Table, Tooltip, theme } from 'antd'
import { EditFilled, DeleteFilled } from '@ant-design/icons'
import { useStyle } from '@hook'
import { textFitler, textSort } from '@helper'

const TempPage = () => {
    const dataSource = [
        {
            key: '1',
            hoten: 'Huỳnh Hữu Bảo Khoa',
            gioiTinh: 'Nam',
            email: 'khoa@gmail.com',
            ngaySinh: '14/11/2001',
        },
        {
            key: '2',
            hoten: 'Nguyễn Văn A',
            gioiTinh: 'Nam',
            email: 'nva@gmail.com',
            ngaySinh: '11/02/2000',
        },
        {
            key: '3',
            hoten: 'Nguyễn Lê Đoan Thùy',
            gioiTinh: 'Nữ',
            email: 'nldt@gmail.com',
            ngaySinh: '09/09/2001',
        },
        {
            key: '4',
            hoten: 'Hồ Vĩnh Duy',
            gioiTinh: 'Nam',
            email: 'hvd@gmail.com',
            ngaySinh: '01/12/1999',
        },
        {
            key: '5',
            hoten: 'Châu Nhuận Phát',
            gioiTinh: 'Nam',
            email: 'cnphat@gmail.com',
            ngaySinh: '12/02/2003',
        },
        {
            key: '6',
            hoten: 'Châu Ngọc Hùng',
            gioiTinh: 'Nam',
            email: 'cnhung@gmail.com',
            ngaySinh: '20/06/2004',
        },
        {
            key: '7',
            hoten: 'Nguyễn Lâm Đình Khoa',
            gioiTinh: 'Nữ',
            email: 'nldkhoa@gmail.com',
            ngaySinh: '28/04/2000',
        },
        {
            key: '8',
            hoten: 'Lâm Phúc',
            gioiTinh: 'Nam',
            email: 'lphuc@gmail.com',
            ngaySinh: '04/02/2001',
        },
    ]

    const { token } = useStyle(theme.useToken().token)

    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 2,
            position: ['bottomCenter'], //none, topLeft, topCenter, topRight, bottomLeft, bottomCenter, bottomRight
        },
    })

    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [filteredInfo, setFilteredInfo] = useState({})
    const [sortedInfo, setSortedInfo] = useState({})

    const fetchData = () => {
        setLoading(true)
        setTimeout(() => {
            setData(
                dataSource.slice(
                    (tableParams.pagination.current - 1) *
                        tableParams.pagination.pageSize,
                    (tableParams.pagination.current - 1) *
                        tableParams.pagination.pageSize +
                        tableParams.pagination.pageSize
                )
            )
            setLoading(false)
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: dataSource.length,
                },
            })
        }, 300)
    }
    useEffect(() => {
        fetchData()
    }, [tableParams.pagination?.current, tableParams.pagination?.pageSize])

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeyst, selectedItemst) => {
            setSelectedRowKeys(selectedRowKeyst)
            setSelectedItems(selectedItemst)
            console.log(
                \`selectedRowKeys: \${selectedRowKeyst}\`,
                'selectedItems: ',
                selectedItemst
            )
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            name: record.name,
        }),
    }

    const handleEdit = (item) => {
        console.log('Edit item', item)
    }

    const handleDelete = (item) => {
        console.log('Delete item', item)
    }

    const handleDeleteSelectedItems = () => {
        console.log('Deleted itemKeys', selectedRowKeys)
        console.log('Deleted items', selectedItems)
        setDeleteLoading(true)
        setTimeout(() => {
            setSelectedRowKeys([])
            setSelectedItems([])
            setDeleteLoading(false)
        }, 1000)
    }

    const handleChange = (pagination, filters, sorter) => {
        console.log('handleChange', pagination, filters, sorter)
        setFilteredInfo(filters)
        setSortedInfo(sorter)
        setTableParams({
            pagination,
            filters,
            ...sorter,
        })

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([])
        }
    }

    const clearFilters = () => {
        setFilteredInfo({})
    }
    const clearAll = () => {
        setFilteredInfo({})
        setSortedInfo({})
    }
    const setHotenSort = () => {
        setSortedInfo({
            order: 'descend',
            columnKey: 'hoten',
        })
    }

    const columns = [
        {
            title: 'Họ và tên',
            dataIndex: 'hoten',
            key: 'hoten',
            // width: 150,
            ellipsis: {
                showTitle: false, //...
            },
            render: (hoten) => (
                <Tooltip
                    placement='topLeft'
                    title={hoten}
                >
                    {hoten}
                </Tooltip>
            ),
            filters: [
                {
                    text: 'Khoa',
                    value: 'Khoa',
                },
                {
                    text: 'Châu',
                    value: 'Châu',
                },
            ],
            filterSearch: true,
            onFilter: (value, record) => textFitler(value, record.hoten),
            // defaultSortOrder: 'descend',
            sorter: {
                compare: (a, b) => textSort(a.hoten, b.hoten),
                multiple: 3,
            },
            sortDirections: ['ascend', 'descend'],

            //gan filter, sort
            filteredValue: filteredInfo.hoten || null,
            sortOrder:
                sortedInfo.columnKey === 'hoten' ? sortedInfo.order : null,
        },
        {
            title: 'Giới tính',
            dataIndex: 'gioiTinh',
            key: 'gioiTinh',
            filters: [
                {
                    text: 'Nam',
                    value: 'Nam',
                },
                {
                    text: 'Nữ',
                    value: 'Nữ',
                },
            ],
            filterSearch: true,
            onFilter: (value, record) => textFitler(value, record.gioiTinh),
            // defaultSortOrder: 'descend',
            sorter: {
                compare: (a, b) => textSort(a.gioiTinh, b.gioiTinh),
                multiple: 2,
            },
            sortDirections: ['ascend', 'descend'],

            //gan filter, sort
            filteredValue: filteredInfo.gioiTinh || null,
            sortOrder:
                sortedInfo.columnKey === 'gioiTinh' ? sortedInfo.order : null,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Ngày sinh',
            key: 'ngaySinh',
            dataIndex: 'ngaySinh',
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'center',
            render: (_, item) => (
                <Space size='middle'>
                    <Tooltip title='sửa'>
                        <Button
                            onClick={() => handleEdit(item)}
                            type='primary'
                            icon={<EditFilled style={{ color: 'white' }} />}
                        />
                    </Tooltip>
                    <Tooltip title='xóa'>
                        <Button
                            onClick={() => handleDelete(item)}
                            style={{
                                backgroundColor: token.red,
                                color: 'white',
                            }}
                            danger
                            icon={<DeleteFilled style={{ color: 'white' }} />}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ]

    return (
        <>
            <Space
                style={{
                    width: '100%',
                    justifyContent: 'end',
                    marginBottom: 16,
                }}
            >
                <Button onClick={setHotenSort}>Sort hoten</Button>
                <Button onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
                <Tooltip title='xóa item đã chọn'>
                    <Button
                        disabled={
                            selectedRowKeys.length <= 0 ||
                            selectedItems.length <= 0
                        }
                        loading={deleteLoading}
                        onClick={handleDeleteSelectedItems}
                        style={
                            selectedRowKeys.length <= 0 ||
                            selectedItems.length <= 0
                                ? {
                                      backgroundColor: token.gray,
                                      color: 'black',
                                  }
                                : { backgroundColor: token.red, color: 'white' }
                        }
                        danger
                    >
                        Delete
                    </Button>
                </Tooltip>
            </Space>

            <Table
                rowSelection={{
                    type: 'checkbox', //radio
                    ...rowSelection,
                }}
                dataSource={data}
                loading={loading}
                pagination={tableParams.pagination}
                columns={columns}
                showSorterTooltip={true}
                onChange={handleChange}
                // rowKey={(record) => record.id}
                scroll={{
                    y: 240,
                    x: 100,
                }}
            />
        </>
    )
}

export default TempPage

            `,
        },
    ]

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
            }}
        >
            <Space
                direction='vertical'
                size='large'
                style={{ width: '100%' }}
            >
                {codeStrings.map((item, index) => (
                    <Card
                        key={index}
                        title={item.title}
                        bordered={false}
                    >
                        <CodeBlock codeString={item.code} />
                    </Card>
                ))}
            </Space>
        </div>
    )
}

export default HowToUseTable
