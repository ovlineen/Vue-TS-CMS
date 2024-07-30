const moduleConfig = {
    title: {
        createTitle: '创建部门',
        editTitle: '编辑部门'
    },
    pageList: [
        {
            type: 'normal',
            label: '部门名称',
            prop: 'name',
            placeholder: '请输入部门名称'
        },
        {
            type: 'select',
            label: '上级部门',
            prop: 'parentId',
            placeholder: '请选择上级部门'
        },
        {
            type: 'normal',
            label: '领导名称',
            prop: 'leader',
            placeholder: '请输入领导名称'
        }
    ]
}

export default moduleConfig
