import React from 'react'

interface IListProps<T> {
    items: T[];
    renderItems: (item: T) => React.ReactNode;
    className?: string;
}

function List<T> (props: IListProps<T>) {
  return (
    <div className={props.className}>
        {props.items.map(props.renderItems)}
    </div>
  );
}

export default List;