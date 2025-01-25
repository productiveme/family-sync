import { Router, Route } from 'wouter'
import { Home } from '../pages/Home'
import { Layout } from '../components/Layout'
import { PostDetail } from '../pages/PostDetail'

export const AppRouter = () => (
  <Router>
    <Layout>
      <Route path="/" component={Home} />
      <Route path="/post/:id" component={PostDetail} />
    </Layout>
  </Router>
)
