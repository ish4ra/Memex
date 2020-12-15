import React, { PureComponent } from 'react'
import styled, { css } from 'styled-components'

import styles, { fonts } from 'src/dashboard-refactor/styles'
import colors from 'src/dashboard-refactor/colors'

import { Icon } from '../../../styled-components'
import UnstyledListsSidebarItem from '../lists-sidebar-item'
import Margin from 'src/dashboard-refactor/components/Margin'
import { ListsSidebarItemProps } from '../lists-sidebar-item/types'
import { ListSource } from 'src/dashboard-refactor/types'

const Container = styled.div`
    position: relative;
`

const ListsSidebarItem = styled(UnstyledListsSidebarItem)`
    width: 173px;
`

const MenuContainer = styled.div`
    width: min-content;
    position: absolute;
    left: 175px;
    top: 0px;
    background-color: ${colors.white};
    box-shadow: ${styles.boxShadow.overlayElement};
    border-radius: ${styles.boxShadow.overlayElement};
    ${(props) =>
        css`
            display: ${props.isDisplayed
                ? `flex; flex-direction: column`
                : `none`};
        `};
`

const MenuButton = styled.div`
    height: 34px;
    min-width: 102px;
    font-family: ${fonts.primary.name};
    font-weight: ${fonts.primary.weight.normal};
    font-size: 12px;
    line-height: 18px;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    cursor: pointer;

    &:hover {
        background-color: ${colors.onHover};
    }
`

export interface ListsSidebarItemWithMenuProps extends ListsSidebarItemProps {
    name: string
    listId: string
    source?: ListSource
    isMenuDisplayed?: boolean
    onUnfollowClick?: React.MouseEventHandler
    onRenameClick?: React.MouseEventHandler
    onDeleteClick?: React.MouseEventHandler
    onShareClick?: React.MouseEventHandler
}

export default class ListsSidebarItemWithMenu extends PureComponent<
    ListsSidebarItemWithMenuProps
> {
    private renderMenuBtns() {
        if (!this.props.source) {
            return false
        }

        if (this.props.source === 'followed-list') {
            return (
                <>
                    <MenuButton onClick={this.props.onUnfollowClick}>
                        <Margin horizontal="10px">
                            <Icon heightAndWidth="12px" path={'TODO.svg'} />
                        </Margin>
                        Unfollow
                    </MenuButton>
                </>
            )
        }

        return (
            <>
                <MenuButton onClick={this.props.onShareClick}>
                    <Margin horizontal="10px">
                        <Icon heightAndWidth="12px" path={'TODO.svg'} />
                    </Margin>
                    Share
                </MenuButton>
                <MenuButton onClick={this.props.onDeleteClick}>
                    <Margin horizontal="10px">
                        <Icon heightAndWidth="12px" path={'TODO.svg'} />
                    </Margin>
                    Delete
                </MenuButton>
                <MenuButton onClick={this.props.onRenameClick}>
                    <Margin horizontal="10px">
                        <Icon heightAndWidth="12px" path={'TODO.svg'} />
                    </Margin>
                    Rename
                </MenuButton>
            </>
        )
    }

    render() {
        const {
            className,
            name: listName,
            isEditing,
            selectedState,
            hoverState,
            dropReceivingState,
            newItemsCountState,
            moreActionButtonState,
            isMenuDisplayed,
            listId,
        } = this.props
        return (
            <Container>
                <ListsSidebarItem
                    className={className}
                    listName={listName}
                    isEditing={isEditing}
                    hoverState={{
                        onHoverEnter() {
                            hoverState.onHoverEnter(listId)
                        },
                        onHoverLeave() {
                            hoverState.onHoverLeave(listId)
                        },
                        ...hoverState,
                    }}
                    selectedState={{
                        onSelected() {
                            selectedState.onSelection(listId)
                        },
                        ...selectedState,
                    }}
                    dropReceivingState={{
                        onDragOver() {
                            dropReceivingState.onDragOver(listId)
                        },
                        onDragLeave() {
                            dropReceivingState.onDragLeave(listId)
                        },
                        ...dropReceivingState,
                    }}
                    newItemsCountState={newItemsCountState}
                    moreActionButtonState={{
                        onMoreActionClick() {
                            moreActionButtonState.onMoreActionClick(listId)
                        },
                        ...moreActionButtonState,
                    }}
                />
                <MenuContainer isDisplayed={isMenuDisplayed}>
                    {this.renderMenuBtns()}
                </MenuContainer>
            </Container>
        )
    }
}
