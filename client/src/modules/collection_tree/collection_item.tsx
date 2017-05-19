import React from 'react';
import { Icon, Menu } from 'antd';
import ItemWithMenu from '../../components/item_with_menu';
import './style/index.less';
import { deleteDlg } from '../../components/confirm_dialog/index';

interface CollectionItemProps {
    name: string;

    recordCount: number;

    onNameChanged(name: string);

    deleteCollection();
}

interface CollectionItemState {
}

class CollectionItem extends React.Component<CollectionItemProps, CollectionItemState> {

    itemWithMenu: ItemWithMenu;

    getMenu = () => {
        return (
            <Menu className="item_menu" onClick={this.onClickMenu}>
                <Menu.Item key="edit">
                    <Icon type="edit" /> Rename
                </Menu.Item>
                <Menu.Item key="folder">
                    <Icon type="folder" /> Create folder
                </Menu.Item>
                <Menu.Item key="copy">
                    <Icon type="copy" /> Duplicate
                </Menu.Item>
                <Menu.Item key="delete">
                    <Icon type="delete" /> Delete
                </Menu.Item>
            </Menu>
        );
    }

    onClickMenu = (e) => {
        this[e.key]();
    }

    delete = () => deleteDlg('collection', () => this.props.deleteCollection());

    edit = () => {
        if (this.itemWithMenu) {
            this.itemWithMenu.edit();
        }
    }

    public render() {

        return (
            <ItemWithMenu
                ref={ele => this.itemWithMenu = ele}
                onNameChanged={this.props.onNameChanged}
                icon={<Icon className="c-icon" type="wallet" />}
                name={this.props.name}
                subName={<div>{`${this.props.recordCount} requests`}</div>}
                menu={this.getMenu()}
            />
        );
    }
}

export default CollectionItem;