interface Data {
  id: number
  name: string
  children?: Data[]
}

const data: Data[] = [
  {
    id: 1,
    name: 'node js',
    children: [
      {
        id: 2,
        name: 'nooo1',
      },
      {
        id: 3,
        name: 'nooo2',
      },
      {
        id: 4,
        name: 'nooo3',
      },
    ],
  },
  {
    id: 6,
    name: 'namelist',
    children: [
      {
        id: 7,
        name: 'name2',
      },
      {
        id: 8,
        name: 'name3',
      },
      {
        id: 9,
        name: 'name4',
        children: [
          {
            id: 10,
            name: 'name5',
          },
          {
            id: 11,
            name: 'name6',
          },
          {
            id: 12,
            name: 'name7',
          },
        ],
      },
    ],
  },
]

export const HomePage: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        padding: '8px',
        backgroundColor: 'gray',
      }}
    >
      {data.map((item) => (
        <details>
          <summary>Иконка {item.name}</summary>
          <Row item={item} />
        </details>
      ))}
    </div>
  )
}

type RowProps = {
  item: Data
}

export const Row = ({ item }: RowProps) => {
  if (!item.children) return <div style={{ paddingLeft: '8px' }}>Иконка {item.name}</div>
  return (
    <>
      {item.children.map((i) => {
        if (!i.children) return <div style={{ paddingLeft: '8px' }}>Иконка {i.name}</div>
        return (
          <details style={{ paddingLeft: '8px' }}>
            <summary>Иконка {i.name}</summary>
            <Row key={i.id} item={i} />
          </details>
        )
      })}
    </>
  )
}
