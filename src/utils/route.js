const master = 'admin'
const business = 'cadmin'
const active = location.pathname.split('/')[1]
export const baseRoute = {
  master,
  business,
  active,
  isBusiness: active === business,
  isMaster: active === master,
}
