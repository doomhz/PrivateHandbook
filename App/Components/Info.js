import React from 'react'
import {
  Container, Content,
  Header, Title,
  Icon, Button, Text, View
} from 'native-base'
import {
  TYPE_DO, TYPE_DECIDE, TYPE_DELEGATE,
  TYPE_DELETE
} from '../lib/phbw/src/constants'
import {Paragraph, BulletList} from './StaticText'
import {
  infoStyles
} from '../lib/Styles'

const TITLES = {
  [`${TYPE_DO}`]: 'Urgent Important',
  [`${TYPE_DECIDE}`]: 'Not Urgent Important',
  [`${TYPE_DELEGATE}`]: 'Urgent Not Important',
  [`${TYPE_DELETE}`]: 'Not Urgent Not Important'
}

class Info extends React.Component{
  constructor(props) {
    super(props)
  }
  goBack(){
    this.props.navigator.pop()
  }
  render() {
    return (
      <Container style={{backgroundColor: '#fff'}}>
        <Header>
          <Button
            transparent
            onPress={()=> this.goBack()}
          >
            <Icon name='ios-arrow-back' />
          </Button>
          <Title>{TITLES[this.props.infoName]} ({this.props.infoName.toUpperCase()})</Title>
        </Header>
        <Content>
          {MATRIX_INFO[this.props.infoName]}
        </Content>
      </Container>
    )
  }
}

const MATRIX_INFO = {
  [`${TYPE_DO}`]: (
    <View style={infoStyles.infoContainer}>
      <Paragraph>
        Quadrant 1 tasks are both urgent and important. They’re tasks that require our immediate attention and also work 
      towards fulfilling our long-term goals and missions in life.
      </Paragraph>
      <Paragraph style={{fontWeight: 'bold'}}>
        Quadrant 1 tasks typically consist of crises, problems, or deadlines.
      </Paragraph>
      <Paragraph>
        Here are a few specific examples of Urgent and Important tasks:
      </Paragraph>
      <BulletList
        items={[
          'Certain emails (could be a job offer, an email for a new business opportunity that requires immediate action, etc.)',
          'Term paper deadline',
          'Tax deadline',
          'Wife in emergency room',
          'Car engine goes out',
          'Household chores',
          'You have a heart attack and end up in the hospital',
          'You get a call from your kid’s principal saying you need to come in for a meeting about his behavior'
        ]}
      />
      <Paragraph>
        With a bit of planning and organization, many Q1 tasks can be made more efficient or even eliminated outright. 
        For example, instead of waiting until the last minute to work on a term paper (thus turning it into an urgent task), 
        you could schedule your time so that you’re done with your paper a week in advance. Or instead of waiting for something in 
        your house to fall apart and need fixing, you can follow a schedule of regular maintenance.
      </Paragraph>
      <Paragraph style={{fontStyle: 'italic'}}>
        While we’ll never be able to completely eliminate urgent and important tasks, we can significantly reduce them with a 
        bit of proactivity and by spending more time in Quadrant 2.
      </Paragraph>
    </View>
  ),
  [`${TYPE_DECIDE}`]: (
    <View style={infoStyles.infoContainer}>
      <Paragraph>
        Quadrant 2 tasks are the activities that don’t have a pressing deadline, but nonetheless help you achieve your important 
        personal, school, and work goals as well as help you fulfill your overall mission as a man.
      </Paragraph>
      <Paragraph style={{fontWeight: 'bold'}}>
        Q2 tasks are typically centered around strengthening relationships, planning for the future, and improving yourself.
      </Paragraph>
      <Paragraph>
        Here are some specific examples of Not Urgent but Important Tasks:
      </Paragraph>
      <BulletList
        items={[
          'Weekly planning',
          'Long-term planning',
          'Exercising',
          'Family time',
          'Reading life-enriching books',
          'Journaling',
          'Taking a class to improve a skill',
          'Spending time with a rewarding hobby',
          'Studying',
          'Meditating',
          'Service',
          'Car and home maintenance',
          'Date night with wife',
          'Creating a budget and savings plan'
        ]}
      />
      <Text></Text>
      <Paragraph>
        <Text style={{fontWeight: 'bold'}}>We should seek to spend most of our time on Q2 activities</Text>, as they’re the ones that provide us lasting happiness, fulfillment, 
        and success. Unfortunately, there are a couple key challenges that keep us from investing enough time and energy into Q2 tasks:
      </Paragraph>
      <BulletList
        items={[
          <Text>
            <Text style={{fontWeight: 'bold'}}>You don’t know what’s truly important to you. </Text> 
            <Text>If you don’t have any idea what values and goals matter most to you, you obviously won’t know what things you should 
              be spending your time on to reach those aims! Instead, you’ll latch on to whatever stimuli and to-dos are most urgent. If you feel like you’re lacking a life’s 
              mission or aren’t sure what your core values are, I highly recommend reading our articles on developing a life plan as well as defining your core values.
            </Text>
          </Text>,
          <Text>
            <Text style={{fontWeight: 'bold'}}>Present bias. </Text>
            <Text>As just discussed, we all have an inclination to focus on whatever is most pressing at the moment. Doing so is our default mode. It’s hard to 
              get motivated to do something when there isn’t a deadline looming over our head. Departing from this fallback position takes willpower and self-discipline 
              – qualities that don’t come naturally and must be actively cultivated and expressed.
            </Text>
          </Text>
        ]}
      />
      <Paragraph>
        Because Q2 activities aren’t pressing for our attention, we typically keep them forever on the backburner of our lives and tell ourselves, “I’ll get to those things 
        ‘someday’ after I’ve taken care of this urgent stuff.” We even put off figuring out what’s most important in life, which of course only perpetuates a cycle where all we ever take care of are the most urgent to-dos on our list.
      </Paragraph>
      <Paragraph>
        But “someday” will never come; if you’re waiting to do the important stuff until your schedule clears up a little, trust me when I say that it won’t. You’ll always feel about as busy as you are now, and if anything, 
        life just gets busier as you get older (at least until you retire).
      </Paragraph>
      <Paragraph>
        <Text style={{fontWeight: 'bold'}}>To overcome our inherent present-bias that prevents us from focusing on Quadrant 2 activities, we must live our lives intentionally and proactively. </Text> 
        You can’t run your life in default mode. You have to consciously decide, 
        “I’m going to make time for these things come hell or high water.”
      </Paragraph>
    </View>
  ),
  [`${TYPE_DELEGATE}`]: (
    <View style={infoStyles.infoContainer}>
      <Paragraph>
        Quadrant 3 tasks are activities that require our attention now (urgent), but don’t help us achieve our goals or fulfill our mission (not important). 
        <Text style={{fontWeight: 'bold'}}> Most Q3 tasks are interruptions from other people and often involve helping them meet their own goals and fulfill their own priorities.</Text>
      </Paragraph>
      <Paragraph>
        Here are some specific examples of Quadrant 3 activities:
      </Paragraph>
      <BulletList
        items={[
          'Phone calls',
          'Text messages',
          'Most emails (some emails could be urgent and important)',
          'Co-worker who comes by your desk during your prime working time to ask a favor',
          'Request from a former employee to write a letter of recommendation on his behalf (it’s probably important to him, but let’s face it, it’s probably not that important to you)',
          'Mom drops in unannounced and wants your help with a chore'
        ]}
      />
      <Paragraph>
        Many people spend most of their time on Q3 tasks, all the while thinking they’re working in Q1. Because Q3 tasks do help others out, they definitely feel important. Plus they’re also usually tangible 
        tasks, the completion of which gives you that sense of satisfaction that comes from checking something off your list.
      </Paragraph>
      <Paragraph>
        But while Q3 tasks may be important to others, they’re not important to you. They’re not necessarily bad, but they need to be balanced with your Q2 activities. Otherwise, you’ll end up feeling like you’re getting a 
        lot done from day-to-day, while eventually realizing that you’re not actually making any progress in your own long-term goals. That’s a recipe for personal frustration and resentment towards other people.
      </Paragraph>
      <Paragraph style={{fontWeight: 'bold'}}>
        Men who spend most of their time working on Urgent but Not Important Tasks often suffer from “Nice Guy Syndrome,” and want to constantly please others at the expense of their own happiness.
      </Paragraph>
      <Paragraph>
        If that’s you, the solution is simple: Become more assertive and start to firmly (but politely) say no to most requests.
      </Paragraph>
    </View>
  ),
  [`${TYPE_DELETE}`]: (
    <View style={infoStyles.infoContainer}>
      <Paragraph>
        Quadrant 4 activities aren’t urgent and aren’t important. They’re what I like to call “dicking around” activities. 
        <Text style={{fontWeight: 'bold'}}> Q4 activities aren’t pressing nor do they help you achieve long-term goals or fulfill your mission as a man. They’re primarily distractions.</Text>
      </Paragraph>
      <Paragraph>
        Specific examples of Not Urgent and Not Important Tasks include:
      </Paragraph>
      <BulletList
        items={[
          'Watching TV',
          'Mindlessly surfing the web',
          'Playing video games',
          'Scrolling through Facebook, Twitter, Instagram',
          'Gambling',
          'Shopping sprees'
        ]}
      />
      <Paragraph>
        I think if most of us did a time audit on ourselves, we’d find that we spend an inordinate amount of time on Q4 activities. 
        I’m sure most of us have those “I’m wasting my life” moments after we’ve spent hours surfing the web and realize we could have used that time to pursue our more ennobling life goals. 
        No? That’s just me? Dang.
      </Paragraph>
      <Paragraph>
        As a pragmatist, I don’t think you need to eliminate Q4 activities altogether from your life. After a particularly hectic and busy day, randomly browsing the internet or watching a 
        favorite TV show for a half hour is exactly what my brain needs to decompress.
      </Paragraph>
      <Paragraph style={{fontWeight: 'bold'}}>
        Instead of aiming to completely rid yourself of Not Urgent and Not Important tasks, try to only spend a very limited amount of time on them. 5% or less of your waking hours is a good goal.
      </Paragraph>
    </View>
  )
}

module.exports = Info