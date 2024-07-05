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
import {
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    deleteManyUser,
    getUserById,
} from '@service/userService'
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

const Target = () => {
    const { token } = useStyle(theme.useToken().token)
    const { showModal } = useModal()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 4,
            position: ['bottomCenter'],
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

    const [popoverOpen, setPopoverOpen] = useState(false)

    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

    useEffect(() => {
        fetchData()
    }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
        filteredInfo,
    ])

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm)
        }, 500)

        return () => {
            clearTimeout(handler)
        }
    }, [searchTerm])

    useEffect(() => {
        console.log('Gọi hàm tìm kiếm với:', debouncedSearchTerm)
        handleSearch(debouncedSearchTerm)
    }, [debouncedSearchTerm])

    const fetchData = (onFinish) => {
        setLoading(true)
        setTimeout(
            () => {
                const users = getUsers(
                    tableParams.pagination.current,
                    tableParams.pagination.pageSize,
                    filteredInfo
                )
                setData(users.data)
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: users.total,
                    },
                })
                setLoading(false)
                if (onFinish) onFinish()
            },
            onFinish ? 1000 : 50
        )
    }

    const handleSearch = async (text) => {
        setFilteredInfo({
            ...filteredInfo,
            hoten: trim(text) != null && trim(text) != '' ? [text] : null,
        })
    }

    const handleChange = (pagination, filters, sorter) => {
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

    const onAddConfirm = async () => {
        console.log('onAddConfirm')
        try {
            const values = await form.validateFields()
            const newData = {
                ...values,
                ngaySinh: values.ngaySinh.format('DD/MM/YYYY'),
            }

            setItemUpdateAddLoading(true)
            addUser(newData)
            fetchData(() => {
                setItemUpdateAddLoading(false)
                showModal({
                    status: 'success',
                    title: 'Thêm thành công',
                    content: ['Đã thêm item thành công'],
                    onOk: () => {
                        setOpenItemUpdateAddModal(false)
                    },
                })
            })
        } catch (errorInfo) {
            showModal({
                status: 'error',
                title: 'Lỗi client',
                content: [errorInfo.toString()],
            })
        }
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
            updateUser(newData)
            fetchData(() => {
                setItemUpdateAddLoading(false)
                showModal({
                    status: 'success',
                    title: 'Cập nhật thành công',
                    content: ['Cập nhật item thành công'],
                    onOk: () => {
                        setOpenItemUpdateAddModal(false)
                    },
                })
            })
        } catch (errorInfo) {
            showModal({
                status: 'error',
                title: 'Lỗi client',
                content: [errorInfo.toString()],
            })
        }
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
                try {
                    setOnProcessingItem(item.key)
                    deleteUser(item.key)
                    fetchData(() => {
                        const tempSelectedKeys = selectedRowKeys.filter(
                            (key) => key !== item.key
                        )
                        const tempSelectedItems = selectedRowKeys.filter(
                            (itemt) => itemt.key !== item.key
                        )
                        setSelectedRowKeys(tempSelectedKeys)
                        setSelectedItems(tempSelectedItems)
                        setOnProcessingItem('')

                        showModal({
                            status: 'success',
                            title: 'Xóa thành công',
                            content: ['Đã xóa item thành công'],
                        })
                    })
                } catch {
                    showModal({
                        status: 'error',
                        title: 'Lỗi client',
                        content: ['Lỗi client'],
                    })
                }
            },
        })
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
                try {
                    setOnProcessingItems(selectedRowKeys)
                    deleteManyUser(selectedRowKeys)
                    fetchData(() => {
                        setSelectedRowKeys([])
                        setSelectedItems([])
                        setDeleteItemsLoading(false)
                        setOnProcessingItems([])
                        showModal({
                            status: 'success',
                            title: 'Xóa thành công',
                            content: ['Đã xóa các item thành công'],
                        })
                    })
                } catch {
                    showModal({
                        status: 'error',
                        title: 'Lỗi client',
                        content: ['Lỗi client'],
                    })
                }
            },
        })
    }

    const handlePopoverChange = (popoverOpen) => {
        setPopoverOpen(popoverOpen)
    }

    const clearAll = () => {
        setFilteredInfo({})
        setSortedInfo({})
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

    const columns = [
        {
            title: 'Họ và tên',
            dataIndex: 'hoten',
            key: 'hoten',
            ellipsis: {
                showTitle: false,
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
            sorter: {
                compare: (a, b) => textSort(a.hoten, b.hoten),
                multiple: 3,
            },
            sortDirections: ['ascend', 'descend'],
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
            sorter: {
                compare: (a, b) => textSort(a.gioiTinh, b.gioiTinh),
                multiple: 2,
            },
            sortDirections: ['ascend', 'descend'],
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
                    type: 'checkbox',
                    ...rowSelection,
                }}
                dataSource={data}
                loading={loading}
                pagination={tableParams.pagination}
                columns={columns}
                showSorterTooltip={true}
                onChange={handleChange}
                scroll={{
                    y: 240,
                    x: 100,
                }}
            />
        </>
    )
}

export default Target
