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
    getSinhVien,
    addSinhVien,
    updateSinhVien,
    updateSinhVienStatus,
    deleteSinhVien,
    deleteManySinhVien,
} from '@service/sinhVienService'

import { trim } from 'lodash'

import * as store from '@store'
import {useDispatch, useSelector}from 'react-redux'

const { Title } = Typography

const dataTTSelect = [
    {
        value: 'Còn học',
        label: 'Còn học'
    },
    {
        value: 'Tốt nghiệp',
        label: 'Tốt nghiệp'
    },
    {
        value: 'Tạm dừng',
        label: 'Tạm dừng'
    },
]

const DanhSachSinhVien = () => {
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

    const [itemUpdateAddLoading, setItemUpdateAddLoading] = useState(false)
    const [openItemUpdateAddModal, setOpenItemUpdateAddModal] = useState(false)
    const [isAddForm, setIsAddForm] = useState(true)
    const [currentEditKey, setCurrentEditKey] = useState(null)
    const [form] = Form.useForm()

    const [openCapNhatTTModal, setOpenCapNhatTTModal] = useState(false)
    const [capNhatLoading, setCapNhatLoading] = useState(false)

    const [form2] = Form.useForm()

    useEffect(() => {
        fetchData()
    }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
        filteredInfo,
    ])


    const fetchData = (onFinish) => {
        setLoading(true)
        setTimeout(
            () => {
                const users = getSinhVien(
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

    const handleChange = (pagination, filters, sorter) => {
        console.log(filters)
        setFilteredInfo(filters)
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
        })
        setCurrentEditKey(item.key)
        setIsAddForm(false)
        setOpenItemUpdateAddModal(true)
    }

    const handleCapNhatTT = (item) => {
        form.resetFields()
        setCurrentEditKey(null)
        form.setFieldsValue({
            ...item,
        })
        setCurrentEditKey(item.key)
        setOpenCapNhatTTModal(true)
    }

    const onAddConfirm = async () => {
        console.log('onAddConfirm')
        try {
            const values = await form.validateFields()
            const newData = {
                ...values,
            }

            setItemUpdateAddLoading(true)
            addSinhVien(newData)
            fetchData(() => {
                setItemUpdateAddLoading(false)
                showModal({
                    status: 'success',
                    title: 'Thêm thành công',
                    content: ['Đã thêm sinh viên thành công'],
                    onOk: () => {
                        setOpenItemUpdateAddModal(false)
                    },
                })
            })
        } catch (errorInfo) {
          
        }
    }

    const onEditConfirm = async () => {
        console.log('onEditConfirm')
        try {
            const values = await form.validateFields()
            const newData = {
                key: currentEditKey,
                ...values,
            }
            setItemUpdateAddLoading(true)
            updateSinhVien(newData)
            fetchData(() => {
                setItemUpdateAddLoading(false)
                showModal({
                    status: 'success',
                    title: 'Cập nhật thành công',
                    content: ['Cập nhật sinh viên thành công'],
                    onOk: () => {
                        setOpenItemUpdateAddModal(false)
                    },
                })
            })
        } catch (errorInfo) {
       
        }
    }

    const onCapNhatTTConfirm =  async () => {
        console.log('onCapNhatTTConfirm')
        try {
            const values = await form.validateFields()
            const newData = {
                key: currentEditKey,
                ...values,
            }
            setCapNhatLoading(true)
            updateSinhVienStatus(newData)
            fetchData(() => {
                setCapNhatLoading(false)
                showModal({
                    status: 'success',
                    title: 'Cập nhật sinh viên thành công',
                    content: ['Cập nhật  tình trạng sinh viên thành công'],
                    onOk: () => {
                        setOpenCapNhatTTModal(false)
                    },
                })
            })
        } catch (errorInfo) {
            console.log(errorInfo);
        }
    }

    const handleDelete = (item) => {
        console.log('Delete item', item)
        showModal({
            status: 'confirm',
            title: 'Xác nhận xóa!',
            content: ['Bạn có thật sự muốn xóa sinh viên này?'],
            cancelText: 'Hủy',
            okText: 'Đồng ý',
            onOk: () => {
                try {
                    setOnProcessingItem(item.key)
                    deleteSinhVien(item.key)
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
                            content: ['Đã xóa sinh viên thành công'],
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
            content: ['Bạn có thật sự muốn xóa tất cả các sinh viên đã chọn?'],
            cancelText: 'Hủy',
            okText: 'Đồng ý',
            onOk: () => {
                setDeleteItemsLoading(true)
                try {
                    setOnProcessingItems(selectedRowKeys)
                    deleteManySinhVien(selectedRowKeys)
                    fetchData(() => {
                        setSelectedRowKeys([])
                        setSelectedItems([])
                        setDeleteItemsLoading(false)
                        setOnProcessingItems([])
                        showModal({
                            status: 'success',
                            title: 'Xóa thành công',
                            content: ['Đã xóa các sinh viên thành công'],
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

    const handleTimKiem = async() => {
        console.log('handleTimKiem')
        try {
            const values = await form2.validateFields()
            setFilteredInfo(values)
        } catch (errorInfo) {
          
        }
    }

    const handleRestFitler = () => {
        form2.resetFields()
        setFilteredInfo({})
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
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            width: 60
        },
        {
            title: 'Mã số sinh viên',
            dataIndex: 'mssv',
            key: 'mssv',
        },
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
        },
        {
            title: 'Giới tính',
            dataIndex: 'gioiTinh',
            key: 'gioiTinh',
            width: 100
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'diaChi',
            key: 'diaChi',
        },
        {
            title: 'Điện thoại',
            dataIndex: 'dienThoai',
            key: 'dienThoai',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Tình trạng',
            dataIndex: 'tinhTrang',
            key: 'tinhTrang',
        },
        {
            title: 'Sửa',
            key: 'sua',
            fixed: 'center',
            width: 70,
            render: (item) => (
                <Space size='middle'>
                    <Tooltip title='Sửa thông tin sinh viên'>
                        <Button
                            onClick={() => handleEdit(item)}
                            type='primary'
                            icon={<EditFilled style={{ color: 'white' }} />}
                        />
                    </Tooltip>
                </Space>
            ),
        },
        {
            title: 'Xóa',
            key: 'xoa',
            fixed: 'center',
            width: 70,
            render: (item) => (
                <Space size='middle' >
                     <Tooltip title='Xóa sinh viên'>
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
        {
            title: 'Cập nhật tình trạng',
            key: 'capnhattt',
            fixed: 'center',
            render: (item) => (
                <Space size='middle' style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Tooltip title='Cập nhật tình trạng sinh viên'>
                        <Button
                            onClick={() => handleCapNhatTT(item)}
                            type='primary'
                            icon={<EditFilled style={{ color: 'white' }} />}
                        />
                    </Tooltip>
                </Space>
            ),
        }
    ]

    return (
        <>
            <Modal
                open={openCapNhatTTModal}
                onCancel={() => setOpenCapNhatTTModal(false)}
                footer={[
                    <Button
                        key='submit'
                        type='primary'
                        loading={capNhatLoading}
                        onClick={onCapNhatTTConfirm}
                    >
                        Cập nhật
                    </Button>,
                    <Button
                        key='back'
                        onClick={() => setOpenCapNhatTTModal(false)}
                    >
                        Bỏ qua
                    </Button>,
                ]}
                width={400}
            >
                 <Title
                    level={3}
                    style={{ textAlign: 'center' }}
                >
                    {isAddForm ? 'Thêm sinh viên' : 'Cập nhật sinh viên'}
                </Title>

                <Form
                    form={form}
                    layout='vertical'
                    wrapperCol={{
                        span: 22,
                    }}
                >
                    <Form.Item
                        name='mssv'
                        label='Mã số sinh viên'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mã số sinh viên!',
                            },
                            {
                                min: 6,
                                message: 'Mã số sinh viên phải có ít nhất 6 ký tự!',
                            },
                            {
                                max: 8,
                                message: 'Mã số sinh viên không được vượt quá 8 ký tự!',
                            },
                        ]}
                    >
                        <Input disabled={true}/>
                    </Form.Item>

                    <Form.Item
                        name='tinhTrang'
                        label='Tình trạng'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn tình  trạng!',
                            },
                        ]}
                    >
                        <Select options={dataTTSelect}/>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                open={openItemUpdateAddModal}
                onCancel={() => setOpenItemUpdateAddModal(false)}
                footer={[
                    <Button
                        key='submit'
                        type='primary'
                        loading={itemUpdateAddLoading}
                        onClick={isAddForm ? onAddConfirm : onEditConfirm}
                    >
                        {isAddForm ? 'Thêm' : 'Cập nhật'}
                    </Button>,
                    <Button
                        key='back'
                        onClick={() => setOpenItemUpdateAddModal(false)}
                    >
                        Bỏ qua
                    </Button>,
                ]}
                width={400}
            >
                <Title
                    level={3}
                    style={{ textAlign: 'center' }}
                >
                    {isAddForm ? 'Thêm sinh viên' : 'Cập nhật sinh viên'}
                </Title>

                <Form
                    form={form}
                    layout='vertical'
                    wrapperCol={{
                        span: 22,
                    }}
                >
                    <Form.Item
                        name='mssv'
                        label='Mã số sinh viên'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mã số sinh viên!',
                            },
                            {
                                min: 6,
                                message: 'Mã số sinh viên phải có ít nhất 6 ký tự!',
                            },
                            {
                                max: 8,
                                message: 'Mã số sinh viên không được vượt quá 8 ký tự!',
                            },
                        ]}
                    >
                        <Input disabled={!isAddForm}/>
                    </Form.Item>

                    <Form.Item
                        name='hoten'
                        label='Họ tên'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập họ tên!',
                            },
                            {
                                min: 10,
                                message: 'Họ tên phải có ít nhất 10 ký tự!',
                            },
                            {
                                max: 250,
                                message: 'Họ tên không được vượt quá 250 ký tự!',
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
                        name='diaChi'
                        label='Địa chỉ'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập địa chỉ!',
                            },
                            {
                                min: 10,
                                message: 'Địa chỉ phải có ít nhất 10 ký tự!',
                            },
                            {
                                max: 250,
                                message: 'Địa chỉ không được vượt quá 250 ký tự!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name='dienThoai'
                        label='Điện thoại'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số điện thoại!',
                            },
                            {
                                pattern: /^[0-9]{10,11}$/,
                                message: 'Số điện thoại phải chứa từ 10 đến 11 chữ số!',
                            },
                        ]}
                    >
                        <Input />
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
                </Form>
            </Modal>

            <Space
                style={{
                    width: '100%',
                    justifyContent: 'space-between',
                    marginBottom: 16,
                }}
            >
                <Form
                    layout="inline"
                    form={form2}
                    style={{
                        maxWidth: 'none',
                    }}
                >
                    <Form.Item
                        name='mssv'
                        label='Mã số'
                    >
                        <Input placeholder="Mã số sinh viên" />
                    </Form.Item>
                    <Form.Item
                        name='hoten'
                        label='Họ tên'
                    >
                        <Input placeholder="Họ tên sinh viên" />
                    </Form.Item>
                    <Form.Item
                        name='email'
                        label='Email'
                    >
                        <Input placeholder="Email sinh viên" />
                    </Form.Item>
                </Form>
                <Space>
                    <Tooltip title='Thêm sinh viên'>
                        <Button
                            onClick={handleAdd}
                            icon={<PlusOutlined style={{ color: 'white' }} />}
                            style={{ color: 'white' }}
                            type='primary'
                        >
                            Thêm sinh viên
                        </Button>
                    </Tooltip>
                    <Tooltip title='Xóa các sinh viên đã chọn'>
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
                                            ? (token.isDarkMode ? { color: 'white' } : {color: 'black'})
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
                            <span style={token.isDarkMode ? { color: 'white'} : {}}>Xóa sinh viên đã chọn</span>
                        </Button>
                    </Tooltip>
                </Space>
            </Space>
            <Space
                style={{
                    width: '100%',
                    marginBottom: 16,
                }}
            >
                <Button type="primary" onClick={handleTimKiem}>Tìm kiếm</Button>
                <Button onClick={handleRestFitler} >Đặt lại</Button>
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

export default DanhSachSinhVien
