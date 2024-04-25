import React from 'react'
import {Text, ViewProps} from 'react-native'
import {RootStackParamList} from '../../App'
import {useRoute, RouteProp} from '@react-navigation/native'
import {ImageView} from '../../shared/ImageView'
import styled from 'styled-components/native'

export const DetailScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'DetailScreen'>>()
  const data = route.params.data

  return (
    <Container>
      <Header>Information Card</Header>

      <ImageViewContainer>
        <ImageView uri={data.image} height={300} width={300} />
      </ImageViewContainer>

      <Separator />

      <Section>
        <Label>name:</Label>
        <Value testID="name">{data.name}</Value>
      </Section>

      <Section>
        <Label>origin:</Label>
        <Value testID="origin">{data.origin.name}</Value>
      </Section>

      <Section>
        <Label>gender:</Label>
        <Value testID="gender">{data.gender}</Value>
      </Section>

      <Section>
        <Label>location:</Label>
        <Value testID="location">{data.location.name}</Value>
      </Section>

      <Section>
        <Label>status:</Label>
        <ExecutionStatus testID="status" status={data.status}>
          {data.status}
        </ExecutionStatus>
      </Section>
    </Container>
  )
}

const Container = styled.View`
  padding: 20px;
`

const ImageViewContainer = styled.View`
  justify-content: center;
  align-items: center;
`

const Header = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`

const Section = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
  align-items: center;
`

const Label = styled.Text`
  font-weight: bold;
  margin-right: 10px;
  color: #444;
  width: 80px;
`

const Value = styled(Label)`
  flex: 2;
  color: #666;
`

interface StatusIndicatorProps extends ViewProps {
  status: 'Dead' | 'Alive' | 'unknown'
}
const ExecutionStatus = styled(Text)<StatusIndicatorProps>`
  flex: 2;
  color: ${({status}) => {
    switch (status) {
      case 'Alive':
        return 'green'
      case 'Dead':
        return 'red'
      default:
        return 'gray'
    }
  }};
`

const Separator = styled.View`
  height: 1px;
  background-color: black;
  margin: 20px 0px;
`
