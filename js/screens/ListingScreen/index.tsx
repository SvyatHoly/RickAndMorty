import React, {useEffect, useState, useCallback} from 'react'
import {FlashList} from '@shopify/flash-list'
import axios from 'axios'
import {Loader} from '../../shared/Loader'
import {ListCell} from './ListCell'
import styled from 'styled-components/native'
import {ListRenderItemInfo} from '@shopify/flash-list'
import {Alert} from 'react-native'
import {isValidError} from '../../utils/isValidError'
import {Character} from '../../types/types'

const keyExtractor = (item: Character) => `key-${item.id}`

export const ListingScreen = () => {
  const [data, setData] = useState<Character[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  const fetchCharacters = useCallback(async (nextPage: number) => {
    setLoading(true)

    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character?page=${nextPage}`,
      )

      if (response.data && response.data.info && response.data.results) {
        setData(prev => [...prev, ...response.data.results])
        const {pages} = response.data.info
        setHasMore(pages > nextPage)
        setPage(nextPage)
      }
    } catch (error) {
      const errorMessage = isValidError(error)
        ? error.message
        : 'An unknown error occurred'
      Alert.alert('Error', errorMessage)
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCharacters(1)
  }, [fetchCharacters])

  const loadMoreTransactions = useCallback(() => {
    if (!loading && hasMore) {
      fetchCharacters(page + 1)
    }
  }, [fetchCharacters, hasMore, loading, page])

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<Character>) => <ListCell item={item} />,
    [],
  )

  return (
    <Container>
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={71}
        onEndReached={loadMoreTransactions}
        onEndReachedThreshold={0.3}
        ListFooterComponent={<Loader loading={loading} size={'large'} />}
      />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
`
