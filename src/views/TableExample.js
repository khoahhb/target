import React, { useState, useEffect, useRef } from 'react'
import {
    Button,
    Space,
    Table,
    Tooltip,
    theme,
    Modal,
    Form,
    Input,
    DatePicker,
    Select,
    Radio,
    Typography,
    Popover,
    Checkbox,
    Slider,
} from 'antd'
import {
    EditFilled,
    DeleteFilled,
    PlusOutlined,
    FilterOutlined,
    SearchOutlined,
} from '@ant-design/icons'
import { useStyle, useModal } from '@hook'
import { textFitler, textSort } from '@helper'
import dayjs from 'dayjs'
import { trim } from 'lodash'

const { Title } = Typography

const ngheNghiepDataSelect = [
    {
        value: 'Giáo viên',
        label: 'Giáo viên'
    },
    {
        value: 'Lập trình viên',
        label: 'Lập trình viên'
    },
    {
        value: 'Kỹ sư',
        label: 'Kỹ sư'
    },
    {
        value: 'Bác sĩ',
        label: 'Bác sĩ'
    },
    {
        value: 'Luật sư',
        label: 'Luật sư'
    },
]

let dataOnServer = [
    {
        key: '1',
        hoten: 'Huỳnh Hữu Bảo Khoa',
        gioiTinh: 'Nam',
        email: 'khoa@gmail.com',
        ngaySinh: '14/11/2001',
        ngheNghiep: 'Lập trình viên',
    },
    {
        key: '2',
        hoten: 'Nguyễn Văn A',
        gioiTinh: 'Nam',
        email: 'nva@gmail.com',
        ngaySinh: '11/02/2000',
        ngheNghiep: 'Giáo viên',
    },
    {
        key: '3',
        hoten: 'Nguyễn Lê Đoan Thùy',
        gioiTinh: 'Nữ',
        email: 'nldt@gmail.com',
        ngaySinh: '09/09/2001',
        ngheNghiep: 'Giáo viên',
    },
    {
        key: '4',
        hoten: 'Hồ Vĩnh Duy',
        gioiTinh: 'Nam',
        email: 'hvd@gmail.com',
        ngaySinh: '01/12/1999',
        ngheNghiep: 'Kỹ sư',
    },
    {
        key: '5',
        hoten: 'Châu Nhuận Phát',
        gioiTinh: 'Nam',
        email: 'cnphat@gmail.com',
        ngaySinh: '12/02/2003',
        ngheNghiep: 'Kỹ sư',
    },
    {
        key: '6',
        hoten: 'Châu Ngọc Hùng',
        gioiTinh: 'Nam',
        email: 'cnhung@gmail.com',
        ngaySinh: '20/06/2004',
        ngheNghiep: 'Giáo viên',
    },
    {
        key: '7',
        hoten: 'Nguyễn Lâm Đình Khoa',
        gioiTinh: 'Nữ',
        email: 'nldkhoa@gmail.com',
        ngaySinh: '28/04/2000',
        ngheNghiep: 'Lập trình viên',
    },
    {
        key: '8',
        hoten: 'Lâm Phúc',
        gioiTinh: 'Nam',
        email: 'lphuc@gmail.com',
        ngaySinh: '04/02/2001',
        ngheNghiep: 'Lập trình viên',
    },
    {
        key: '9',
        hoten: 'Hồ Minh Nhật',
        gioiTinh: 'Nam',
        email: 'hmnhat@gmail.com',
        ngaySinh: '11/18/1997',
        ngheNghiep: 'Lập trình viên',
    },
    {
        key: '10',
        hoten: 'Huỳnh Nguyễn Diễm Trang',
        gioiTinh: 'Nữ',
        email: 'hndtrang@gmail.com',
        ngaySinh: '07/07/2007',
        ngheNghiep: 'Giáo viên',
    },
]

const TableExample = () => {
    const { token } = useStyle(theme.useToken().token)
    const { showModal } = useModal()

    const dataRoot = useRef([])
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 4,
            position: ['bottomCenter'], //none, topLeft, topCenter, topRight, bottomLeft, bottomCenter, bottomRight
        },
    })

    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [deleteItemsLoading, setDeleteItemsLoading] = useState(false)
    const [onProcessingItem, setOnProcessingItem] = useState('')
    const [onProcessingItems, setOnProcessingItems] = useState([])
    const [filteredInfo, setFilteredInfo] = useState({})
    const [sortedInfo, setSortedInfo] = useState({})

    const [itemUpdateAddLoading, setItemUpdateAddLoading] = useState(false)
    const [openItemUpdateAddModal, setOpenItemUpdateAddModal] = useState(false)
    const [isAddForm, setIsAddForm] = useState(true)
    const [currentEditKey, setCurrentEditKey] = useState(null)
    const [form] = Form.useForm()

    //Search
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm)
        }, 800)

        return () => {
            clearTimeout(handler)
        }
    }, [searchTerm])

    useEffect(() => {
        console.log('Gọi hàm tìm kiếm với:', debouncedSearchTerm)
        handleSearch(debouncedSearchTerm)
    }, [debouncedSearchTerm])

    const handleSearch = async (text) => {
        setFilteredInfo({
            ...filteredInfo,
            hoten: trim(text) != null && trim(text) != '' ? [text] : null,
        })
    }

    const [popoverOpen, setPopoverOpen] = useState(false)

    const handlePopoverChange = (popoverOpen) => {
        setPopoverOpen(popoverOpen)
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (dataRoot.current && dataRoot.current.length > 0)
            handleLoadDataPerPage()
    }, [tableParams.pagination?.current, tableParams.pagination?.pageSize])

    const fetchData = () => {
        setLoading(true)
        setTimeout(() => {
            dataRoot.current = dataOnServer
            handleLoadDataPerPage()
            setLoading(false)
        }, 2000)
    }

    const handleLoadDataPerPage = () => {
        setData(
            dataRoot.current.slice(
                (tableParams.pagination.current - 1) *
                    tableParams.pagination.pageSize,
                (tableParams.pagination.current - 1) *
                    tableParams.pagination.pageSize +
                    tableParams.pagination.pageSize
            )
        )
        setTableParams({
            ...tableParams,
            pagination: {
                ...tableParams.pagination,
                total: dataRoot.current.length,
            },
        })
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeyst, selectedItemst) => {
            setSelectedRowKeys(selectedRowKeyst)
            setSelectedItems(selectedItemst)
            console.log(
                `selectedRowKeys: ${selectedRowKeyst}`,
                'selectedItems: ',
                selectedItemst
            )
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            name: record.name,
        }),
    }

    const handleChange = (pagination, filters, sorter) => {
        console.log('handleChange', pagination, filters, sorter)
        console.log(filters)
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

    const handleDeleteSelectedItems = () => {
        console.log('Deleted itemKeys', selectedRowKeys)
        console.log('Deleted items', selectedItems)
        showModal({
            status: 'confirm',
            title: 'Xác nhận xóa!',
            content: ['Bạn có thật sự muốn xóa tất cả các item đã chọn?'],
            cancelText: 'Hủy',
            okText: 'Đồng ý',
            onOk: () => {
                setDeleteItemsLoading(true)
                ////Cách 1: nếu xóa thành công chỉ xóa các item trong mảng không cần load lại
                try {
                    setOnProcessingItems(selectedRowKeys)
                    setTimeout(() => {
                        dataRoot.current = dataRoot.current.filter(
                            (item) => !selectedRowKeys.includes(item.key)
                        )
                        handleLoadDataPerPage()
                        setOnProcessingItems([])
                        setSelectedRowKeys([])
                        setSelectedItems([])
                        setDeleteItemsLoading(false)
                        showModal({
                            status: 'success',
                            title: 'Xóa thành công',
                            content: ['Đã xóa các item thành công'],
                        })
                    }, 1200)
                } catch {
                    showModal({
                        status: 'error',
                        title: 'Lỗi server',
                        content: ['Lỗi từ server'],
                    })
                }
                ////Cách 2: Xóa trên server load lại nguyên cục
                // try {
                //     dataOnServer = dataOnServer.filter(
                //         (item) => !selectedRowKeys.includes(item.key)
                //     )
                //     fetchData()

                //     setTimeout(() => {
                //         setSelectedRowKeys([])
                //         setSelectedItems([])
                //         setDeleteItemsLoading(false)
                //         showModal({
                //             status: 'success',
                //             title: 'Xóa thành công',
                //             content: ['Đã xóa các item thành công'],
                //         })
                //     }, 1500)
                // } catch {
                //     showModal({
                //         status: 'error',
                //         title: 'Lỗi server',
                //         content: ['Lỗi từ server'],
                //     })
                // }
            },
        })
    }

    const handleAdd = () => {
        form.resetFields()
        setCurrentEditKey(null)
        setIsAddForm(true)
        setOpenItemUpdateAddModal(true)
    }

    const handleEdit = (item) => {
        form.resetFields()
        setCurrentEditKey(null)
        form.setFieldsValue({
            ...item,
            ngaySinh: dayjs(item.ngaySinh, 'DD/MM/YYYY'),
        })
        setCurrentEditKey(item.key)
        setIsAddForm(false)
        setOpenItemUpdateAddModal(true)
    }

    const handleDelete = (item) => {
        console.log('Delete item', item)
        showModal({
            status: 'confirm',
            title: 'Xác nhận xóa!',
            content: ['Bạn có thật sự muốn xóa item này?'],
            cancelText: 'Hủy',
            okText: 'Đồng ý',
            onOk: () => {
                ////Cách 1: nếu xóa thành công chỉ xóa item trong mảng không cần load lại
                try {
                    setOnProcessingItem(item.key)
                    setTimeout(() => {
                        dataRoot.current = dataRoot.current.filter(
                            (dataItem) => dataItem.key !== item.key
                        )
                        const tempSelectedKeys = selectedRowKeys.filter(
                            (key) => key !== item.key
                        )
                        const tempSelectedItems = selectedItems.filter(
                            (itemt) => itemt.key !== item.key
                        )
                        setSelectedRowKeys(tempSelectedKeys)
                        setSelectedItems(tempSelectedItems)
                        handleLoadDataPerPage()
                        setOnProcessingItem('')
                        showModal({
                            status: 'success',
                            title: 'Xóa thành công',
                            content: ['Đã xóa item thành công'],
                        })
                    }, 600)
                } catch {
                    showModal({
                        status: 'error',
                        title: 'Lỗi server',
                        content: ['Lỗi từ server'],
                    })
                }
                ////Cách 2: Xóa trên server load lại nguyên cục
                // try {
                //     dataOnServer = dataOnServer.filter(
                //         (dataItem) => dataItem.key !== item.key
                //     )
                //     fetchData()
                //     setTimeout(() => {
                //         const tempSelectedKeys = selectedRowKeys.filter(
                //             (key) => key !== item.key
                //         )
                //         const tempSelectedItems = selectedRowKeys.filter(
                //             (itemt) => itemt.key !== item.key
                //         )
                //         setSelectedRowKeys(tempSelectedKeys)
                //         setSelectedItems(tempSelectedItems)
                //         showModal({
                //             status: 'success',
                //             title: 'Xóa thành công',
                //             content: ['Đã xóa item thành công'],
                //         })
                //     }, 1500)
                // } catch {
                //     showModal({
                //         status: 'error',
                //         title: 'Lỗi server',
                //         content: ['Lỗi từ server'],
                //     })
                // }
            },
        })
    }

    const onAddConfirm = async () => {
        console.log('onAddConfirm')
        try {
            const values = await form.validateFields()
            const newData = {
                key: Date.now().toString(),
                ...values,
                ngaySinh: values.ngaySinh.format('DD/MM/YYYY'),
            }

            setItemUpdateAddLoading(true)

            //Cách 2 nếu thêm thành công load lại nguyên cục dataonserer
            // dataOnServer = [...dataOnServer, newData]
            // fetchData()

            setTimeout(() => {
                //Cách 1 nếu thêm thành công thêm 1 record vào data root
                dataRoot.current = [...dataRoot.current, newData]
                handleLoadDataPerPage()

                setItemUpdateAddLoading(false)
                setOpenItemUpdateAddModal(false)
                showModal({
                    status: 'success',
                    title: 'Thêm thành công',
                    content: ['Đã thêm item thành công'],
                    onOk: () => {
                        setOpenItemUpdateAddModal(false)
                    },
                })
            }, 2000)
        } catch (errorInfo) {}
    }

    const onEditConfirm = async () => {
        console.log('onEditConfirm')
        try {
            const values = await form.validateFields()
            const newData = {
                key: currentEditKey,
                ...values,
                ngaySinh: values.ngaySinh.format('DD/MM/YYYY'),
            }
            setItemUpdateAddLoading(true)

            //Cách 2 nếu cập nhật thành công load lại nguyên cục dataonserer
            // dataOnServer = dataOnServer.map((item) =>
            //     item.key === newData.key ? newData : item
            // )
            // fetchData()

            setTimeout(() => {
                //Cách 1 nếu cập nhật thành công thêm 1 record vào data root
                dataRoot.current = dataRoot.current.map((item) =>
                    item.key === newData.key ? newData : item
                )
                handleLoadDataPerPage()

                setItemUpdateAddLoading(false)
                setOpenItemUpdateAddModal(false)
                showModal({
                    status: 'success',
                    title: 'Cập nhật thành công',
                    content: ['Đã cập nhật item thành công'],
                    onOk: () => {
                        setOpenItemUpdateAddModal(false)
                    },
                })
            }, 2000)
        } catch (errorInfo) {}
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

    const areAllPropertiesNull = (obj) => {
        const values = Object.values(obj)

        for (let value of values) {
            if (value !== null) {
                return false
            }
        }

        return true
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
            title: 'Nghề nghiệp',
            key: 'ngheNghiep',
            dataIndex: 'ngheNghiep',
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'center',
            render: (item) => (
                <Space size='middle'>
                    <Tooltip title='Sửa thông tin item'>
                        <Button
                            onClick={() => handleEdit(item)}
                            type='primary'
                            icon={<EditFilled style={{ color: 'white' }} />}
                        />
                    </Tooltip>
                    <Tooltip title='Xóa item'>
                        <Button
                            onClick={() => handleDelete(item)}
                            style={{
                                backgroundColor: token.red,
                                color: 'white',
                            }}
                            danger
                            loading={
                                onProcessingItem == item.key ||
                                onProcessingItems.includes(item.key)
                            }
                            icon={<DeleteFilled style={{ color: 'white' }} />}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ]

    return (
        <>
            <Modal
                open={openItemUpdateAddModal}
                onCancel={() => setOpenItemUpdateAddModal(false)}
                footer={[
                    <Button
                        key='back'
                        onClick={() => setOpenItemUpdateAddModal(false)}
                    >
                        Hủy
                    </Button>,
                    <Button
                        key='submit'
                        type='primary'
                        loading={itemUpdateAddLoading}
                        onClick={isAddForm ? onAddConfirm : onEditConfirm}
                    >
                        {isAddForm ? 'Thêm' : 'Cập nhật'}
                    </Button>,
                ]}
                width={400}
            >
                <Title
                    level={3}
                    style={{ textAlign: 'center' }}
                >
                    {isAddForm ? 'Thêm item' : 'Cập nhật item'}
                </Title>

                <Form
                    form={form}
                    layout='vertical'
                    wrapperCol={{
                        span: 22,
                    }}
                >
                    <Form.Item
                        name='hoten'
                        label='Họ tên'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập họ tên!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='gioiTinh'
                        label='Giới tính'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn giới tính!',
                            },
                        ]}
                    >
                        <Radio.Group>
                            <Radio value='Nam'>Nam</Radio>
                            <Radio value='Nữ'>Nữ</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name='email'
                        label='Email'
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không hợp lệ!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='ngaySinh'
                        label='Ngày sinh'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn ngày sinh!',
                            },
                        ]}
                    >
                        <DatePicker format='DD/MM/YYYY' />
                    </Form.Item>
                    <Form.Item
                        name='ngheNghiep'
                        label='Nghề nghiệp'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn nghề nghiệp!',
                            },
                        ]}
                    >
                        <Select options={ngheNghiepDataSelect}/>
                    </Form.Item>
                </Form>
            </Modal>
            <Space
                style={{
                    width: '100%',
                    justifyContent: 'space-between',
                    marginBottom: 16,
                }}
            >
                <Input
                    placeholder='Tìm kiếm'
                    prefix={<SearchOutlined style={{ cursor: 'pointer' }} />}
                    suffix={
                        <Popover
                            content={
                                <div style={{ padding: 16, width: 330 }}>
                                    {/* Tất cả đều onChange */}
                                    <Input
                                        placeholder='Tìm kiếm'
                                        style={{ marginBottom: 8 }}
                                    />
                                    <DatePicker
                                        style={{
                                            marginBottom: 8,
                                            width: '100%',
                                        }}
                                    />
                                    <Radio.Group style={{ marginBottom: 8 }}>
                                        <Radio value='a'>A</Radio>
                                        <Radio value='b'>B</Radio>
                                    </Radio.Group>
                                    <div>
                                        <Checkbox style={{ marginBottom: 8 }}>
                                            Checkbox
                                        </Checkbox>
                                    </div>
                                    <Slider defaultValue={30} />
                                    <Space style={{ marginTop: 8 }}>
                                        <Button type='primary'>Áp dụng</Button>
                                        <Button>Đặt lại</Button>
                                    </Space>
                                </div>
                            }
                            trigger='click'
                            placement='bottomRight'
                            open={popoverOpen}
                            onOpenChange={handlePopoverChange}
                        >
                            <FilterOutlined style={{ cursor: 'pointer' }} />
                        </Popover>
                    }
                    style={{ width: 350, borderRadius: 16 }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Space>
                    <Button onClick={setHotenSort}>Sort hoten</Button>
                    <Button onClick={clearFilters}>Clear filters</Button>
                    <Button onClick={clearAll}>
                        Clear filters and sorters
                    </Button>
                    <Tooltip title='Thêm item'>
                        <Button
                            onClick={handleAdd}
                            icon={<PlusOutlined style={{ color: 'white' }} />}
                            style={{ color: 'white' }}
                            type='primary'
                        >
                            Add
                        </Button>
                    </Tooltip>
                    <Tooltip title='Xóa item đã chọn'>
                        <Button
                            disabled={
                                selectedRowKeys.length <= 0 ||
                                selectedItems.length <= 0
                            }
                            loading={deleteItemsLoading}
                            onClick={handleDeleteSelectedItems}
                            icon={
                                <DeleteFilled
                                    style={
                                        selectedRowKeys.length <= 0 ||
                                        selectedItems.length <= 0
                                            ? { color: 'black' }
                                            : { color: 'white' }
                                    }
                                />
                            }
                            style={
                                selectedRowKeys.length <= 0 ||
                                selectedItems.length <= 0
                                    ? {
                                          backgroundColor: token.gray,
                                          color: 'black',
                                      }
                                    : {
                                          backgroundColor: token.red,
                                          color: 'white',
                                      }
                            }
                            danger
                        >
                            Delete
                        </Button>
                    </Tooltip>
                </Space>
            </Space>

            <Table
                rowSelection={{
                    type: 'checkbox', //radio
                    ...rowSelection,
                }}
                dataSource={
                    areAllPropertiesNull(setFilteredInfo)
                        ? data
                        : dataRoot.current
                }
                loading={loading}
                pagination={
                    areAllPropertiesNull(setFilteredInfo)
                        ? tableParams.pagination
                        : { pageSize: 5 }
                }
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

export default TableExample
