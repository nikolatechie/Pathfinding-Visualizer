(this["webpackJsonppathfinding-visualizer"]=this["webpackJsonppathfinding-visualizer"]||[]).push([[0],[,,,,,,,,function(t,e,n){t.exports=n(17)},,,,,function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){"use strict";n.r(e);var i=n(0),o=n.n(i),a=n(7),s=n.n(a),r=(n(13),n(1)),u=n(2),c=n(3),l=n(4),h=n(5),d=(n(14),function(t){Object(h.a)(n,t);var e=Object(l.a)(n);function n(){return Object(u.a)(this,n),e.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){var t=this.props,e=t.row,n=t.col,i=t.isStart,a=t.isFinish,s=t.isWall,r=t.onMouseDown,u=t.onMouseEnter,c=t.onMouseUp,l=i?"node-start":a?"node-finish":s?"node-wall":"";return o.a.createElement("div",{id:"node-".concat(e,"-").concat(n),className:"node ".concat(l),onMouseDown:function(){return r(e,n)},onMouseEnter:function(){return u(e,n)},onMouseUp:function(){return c()}})}}]),n}(o.a.Component));n(15);function f(t,e,n,i,o,a){var s=[];return function t(e,n,i,o,a,s,r){var u=e[n][i];if(u.isVisited=!0,u.isFinish)return;s.push(u);var c=[-1,0,1,0],l=[0,1,0,-1];r&&(c=[-1,-1,-1,0,0,1,1,1],l=[-1,0,1,-1,1,-1,0,1]);for(var h=0;h<c.length&&!e[o][a].isVisited;++h){var d=n+c[h],f=i+l[h];d>=0&&d<e.length&&f>=0&&f<e[0].length&&!e[d][f].isVisited&&!e[d][f].isWall&&(e[d][f].previousNode=u,t(e,d,f,o,a,s,r))}}(t,e,n,i,o,s,a),s}function g(t,e,n){return e>=0&&e<t.length&&n>=0&&n<t[0].length&&!t[e][n].isWall}function m(t,e,n,i){return Math.abs(n-t)+Math.abs(i-e)}function v(t,e,n){return!(e<0||e>=t.length||n<0||n>=t[0].length)}var p=0,b=53,E=9,y=9,k=9,w=43,N=function(t){Object(h.a)(n,t);var e=Object(l.a)(n);function n(t){var i;return Object(u.a)(this,n),(i=e.call(this,t)).updateWindowDimensions=function(){i.setState({width:window.innerWidth,height:window.innerHeight});var t=P();i.setState({grid:t}),I(),i.dimensionReset(),window.innerWidth>=740&&window.innerWidth<1440?(document.getElementById("bfs-button").innerText="Breadth-first search",document.getElementById("dfs-button").innerText="Depth-first search"):(document.getElementById("bfs-button").innerText="BFS",document.getElementById("dfs-button").innerText="DFS")},i.toggleCheckbox=function(){i.setState({crossingCorners:!i.state.crossingCorners})},i.toggleButtons=function(){for(var t=document.querySelectorAll("button"),e=0;e<t.length;++e)i.state.animationInProgress?t[e].style="opacity: 1":t[e].style="opacity: 0.65";i.setState({animationInProgress:!i.state.animationInProgress})},i.state={grid:[],mouseIsPressed:!1,crossingCorners:!1,animationInProgress:!1,width:0,height:0},i}return Object(c.a)(n,[{key:"componentDidMount",value:function(){this.updateWindowDimensions(),window.addEventListener("resize",this.updateWindowDimensions);var t=P();this.setState({grid:t})}},{key:"dimensionReset",value:function(){for(var t=this.state.grid,e=0;e<t.length;++e)for(var n=0;n<t[0].length;++n)t[e][n].isStart||t[e][n].isFinish||(document.getElementById("node-".concat(e,"-").concat(n)).className="node")}},{key:"handleMouseDown",value:function(t,e){var n=this.state.grid[t][e].isWall,i=this.state.grid;i[t][e]=B(t,e),i[t][e].isWall=!n,this.setState({grid:i,mouseIsPressed:!0})}},{key:"handleMouseEnter",value:function(t,e){if(this.state.mouseIsPressed){var n=this.state.grid[t][e].isWall,i=this.state.grid;i[t][e]=B(t,e),i[t][e].isWall=!n,this.setState({grid:i})}}},{key:"handleMouseUp",value:function(){this.setState({mouseIsPressed:!1})}},{key:"animateFoundPath",value:function(t){for(var e=function(e){var n=t[e];setTimeout((function(){document.getElementById("node-".concat(n.row,"-").concat(n.col)).className="node node-path"}),25*e)},n=1;n<t.length-1;++n)e(n)}},{key:"getPath",value:function(t){for(var e=[],n=t;null!==n;)e.push(n),n=n.previousNode;return e}},{key:"createRandomGrid",value:function(){this.removePaths();for(var t=P(),e=Math.floor(p*b/5),n=0;n<e;++n){var i=Math.floor(Math.random()*p),o=Math.floor(Math.random()*b);t[i][o].isWall||t[i][o].isStart||t[i][o].isFinish||(t[i][o]=B(i,o),t[i][o].isWall=!0)}this.setState({grid:t})}},{key:"resetGrid",value:function(){for(var t=P(),e=0;e<p;++e)for(var n=0;n<b;++n)e===E&&n===y||e===k&&n===w||(document.getElementById("node-".concat(e,"-").concat(n)).className="node");this.setState({grid:t})}},{key:"getWalls",value:function(){for(var t=this.state.grid,e=[],n=0;n<p;++n)for(var i=0;i<b;++i)t[n][i].isWall&&e.push([n,i]),t[n][i].isStart||t[n][i].isFinish||(document.getElementById("node-".concat(n,"-").concat(i)).className="node");return e}},{key:"removePaths",value:function(){for(var t=P(),e=this.getWalls(),n=0;n<e.length;++n){var i=Object(r.a)(e[n],2),o=i[0],a=i[1];t[o][a].isWall=!0,document.getElementById("node-".concat(o,"-").concat(a)).className="node node-wall"}this.setState({grid:t})}},{key:"dijkstra",value:function(){var t=this;this.toggleButtons(),this.removePaths();for(var e=this.state.grid,n=!0===document.getElementById("check").checked,i=function(t,e,n,i){var o=[];t[e][n].distance=0;for(var a=[],s=0;s<t.length;++s)for(var u=0;u<t[0].length;++u)t[s][u].isWall||a.push([s,u]);a.sort((function(e,n){return t[e[0]][e[1]].distance-t[n[0]][n[1]].distance}));var c=[0,0,-1,1],l=[-1,1,0,0],h=a.length-1;i&&(c=[-1,-1,-1,0,0,1,1,1],l=[-1,0,1,-1,1,-1,0,1]);for(var d=0;d<h;++d){var f=a.shift(),g=Object(r.a)(f,2),m=g[0],v=g[1];if(t[m][v].isVisited=!0,t[m][v].isFinish)break;for(var p=[],b=0;b<c.length;++b){var E=m+c[b],y=v+l[b];E<0||E>=t.length||y<0||y>=t[0].length||(t[E][y].isVisited||t[E][y].isWall||t[m][v].distance+1<t[E][y].distance&&(t[E][y].distance=t[m][v].distance+1,t[E][y].previousNode=t[m][v],p.push(t[E][y])))}p.length&&o.push(p),a.sort((function(e,n){return t[e[0]][e[1]].distance-t[n[0]][n[1]].distance}))}return o}(e,E,y,n),o=this.getPath(e[k][w]),a=function(n){if(n===i.length)return setTimeout((function(){t.animateFoundPath(o)}),20*n),setTimeout((function(){t.toggleButtons()}),20*n+25*(o.length+1)),{v:void 0};setTimeout((function(){for(var t=0;t<i[n].length;++t){var o=i[n][t],a=o.row,s=o.col;e[a][s].isFinish||(document.getElementById("node-".concat(a,"-").concat(s)).className="node node-explore")}}),20*n)},s=0;s<=i.length;++s){var u=a(s);if("object"===typeof u)return u.v}}},{key:"aStar",value:function(){var t=this;this.toggleButtons(),this.removePaths();for(var e=this.state.grid,n=!0===document.getElementById("check").checked,i=function(t,e,n,i,o,a){for(var s=[],r=[],u=0;u<t.length;++u){for(var c=[],l=0;l<t[0].length;++l){var h={parent_i:-1,parent_j:-1,f:0,g:0,h:0};h.f=Number.MAX_VALUE,h.g=Number.MAX_VALUE,h.h=Number.MAX_VALUE,c.push(h)}s.push(c)}var d=e,f=n;s[d][f].f=0,s[d][f].g=0,s[d][f].h=0,s[d][f].parent_i=d,s[d][f].parent_j=f;var v=[];v.push([0,d,f]);var p=[-1,0,0,1],b=[0,-1,1,0];for(a&&(p=[-1,0,0,1,-1,-1,1,1],b=[0,-1,1,0,-1,1,-1,1]);v.length;){var E=v[0][1],y=v[0][2];v.shift(),t[E][y].isVisited=!0;for(var k=void 0,w=void 0,N=void 0,I=[],P=0;P<p.length;++P){var B=E+p[P],M=y+b[P],S=P<4||P>3&&a;if(g(t,B,M)&&S){if(t[B][M].isFinish)return s[B][M].parent_i=E,s[B][M].parent_j=y,t[B][M].previousNode=t[E][y],I.length&&r.push(I),r;t[B][M].isVisited||(k=s[E][y].g+1,P>3&&S&&(k+=.4),N=k+(w=m(B,M,i,o)),(s[B][M].f===Number.MAX_VALUE||s[B][M].f>N)&&(v.push([N,B,M]),v.sort((function(t,e){return t[0]-e[0]})),I.push([B,M]),s[B][M].f=N,s[B][M].g=k,s[B][M].h=w,s[B][M].parent_i=E,s[B][M].parent_j=y,t[B][M].previousNode=t[E][y]))}}r.push(I)}return r}(e,E,y,k,w,n),o=this.getPath(e[k][w]),a=function(e){if(e===i.length)return setTimeout((function(){t.animateFoundPath(o)}),34*e),setTimeout((function(){t.toggleButtons()}),34*e+25*(o.length+1)),{v:void 0};setTimeout((function(){for(var t=0;t<i[e].length;++t){var n=Object(r.a)(i[e][t],2),o=n[0],a=n[1];document.getElementById("node-".concat(o,"-").concat(a)).className="node node-explore"}}),34*e)},s=0;s<=i.length;++s){var u=a(s);if("object"===typeof u)return u.v}}},{key:"bfs",value:function(){var t=this;this.toggleButtons(),this.removePaths();for(var e=this.state.grid,n=e[k][w],i=!0===document.getElementById("check").checked,o=function(t,e,n,i,o,a){var s=[],u=[];u.push([e,n]);var c=[-1,1,0,0],l=[0,0,-1,1];for(a&&(c=[-1,-1,-1,0,0,1,1,1],l=[-1,0,1,-1,1,-1,0,1]);u.length&&!t[i][o].isVisited;){var h=u.shift(),d=Object(r.a)(h,2),f=d[0],g=d[1];t[f][g].isVisited=!0;for(var m=[],v=0;v<c.length;++v){var p=f+c[v],b=g+l[v];p>=0&&p<t.length&&b>=0&&b<t[0].length&&!t[p][b].isVisited&&!t[p][b].isWall&&(u.push([p,b]),p===i&&b===o||m.push([p,b]),t[p][b].isVisited=!0,t[p][b].previousNode=t[f][g])}m.empty||s.push(m)}return s}(e,E,y,k,w,i),a=this.getPath(n),s=function(e){if(e===o.length)return setTimeout((function(){t.animateFoundPath(a)}),15*e),setTimeout((function(){t.toggleButtons()}),15*e+25*(a.length+1)),{v:void 0};setTimeout((function(){for(var t=0;t<o[e].length;++t){var n=Object(r.a)(o[e][t],2),i=n[0],a=n[1];document.getElementById("node-".concat(i,"-").concat(a)).className="node node-explore"}}),15*e)},u=0;u<=o.length;++u){var c=s(u);if("object"===typeof c)return c.v}}},{key:"bidirectionalSearch",value:function(){var t=this;this.toggleButtons(),this.removePaths();for(var e=this.state.grid,n=!0===document.getElementById("check").checked,i=function(t,e,n,i,o,a){var s=[],u=[],c=[],l=[-1,1,0,0],h=[0,0,-1,1];u.push([e,n]),c.push([i,o]);for(var d=[],f=0;f<t.length;++f){for(var g=[],m=0;m<t[0].length;++m)g.push(!1);d.push(g)}for(a&&(l=[-1,-1,-1,0,0,1,1,1],h=[-1,0,1,-1,1,-1,0,1]);u.length||c.length;){var p=u.length?u.shift():[-1,-1],b=Object(r.a)(p,2),E=b[0],y=b[1],k=c.length?c.shift():[-1,-1],w=Object(r.a)(k,2),N=w[0],I=w[1];v(t,E,y)&&(t[E][y].isVisited=!0),v(t,N,I)&&(d[N][I]=!0);for(var P=[],B=0;B<l.length;++B){var M=E+l[B],S=N+l[B],j=y+h[B],W=I+h[B];if(v(t,E,y)&&v(t,M,j)&&!t[M][j].isVisited&&!t[M][j].isWall){if(d[M][j])return P.length&&s.push(P),[s,t[E][y],t[M][j]];t[M][j].isVisited=!0,t[M][j].previousNode=t[E][y],u.push([M,j]),P.push([M,j])}if(v(t,N,I)&&v(t,S,W)&&!d[S][W]&&!t[S][W].isWall){if(t[S][W].isVisited)return P.length&&s.push(P),[s,t[S][W],t[N][I]];d[S][W]=!0,t[S][W].previousNode=t[N][I],c.push([S,W]),P.push([S,W])}}s.push(P)}return[s,t[e][n],t[i][o]]}(e,E,y,k,w,n),o=Object(r.a)(i,3),a=o[0],s=o[1],u=o[2],c=[];!u.isFinish;)c.push(u),u=u.previousNode;for(c.push(e[k][w]),c.reverse();!s.isStart;)c.push(s),s=s.previousNode;c.push(e[E][y]);for(var l=function(e){if(e===a.length)return setTimeout((function(){t.animateFoundPath(c)}),25*e),setTimeout((function(){t.toggleButtons()}),25*e+25*(c.length+1)),{v:void 0};setTimeout((function(){for(var t=0;t<a[e].length;++t){var n=Object(r.a)(a[e][t],2),i=n[0],o=n[1];document.getElementById("node-".concat(i,"-").concat(o)).className="node node-explore"}}),25*e)},h=0;h<=a.length;++h){var d=l(h);if("object"===typeof d)return d.v}}},{key:"dfs",value:function(){var t=this;this.toggleButtons(),this.removePaths();for(var e=this.state.grid,n=!0===document.getElementById("check").checked,i=f(e,E,y,k,w,n),o=this.getPath(e[k][w]),a=function(e){if(e===i.length)return setTimeout((function(){t.animateFoundPath(o)}),30*e),setTimeout((function(){t.toggleButtons()}),30*e+25*(o.length+1)),{v:void 0};var n=i[e];setTimeout((function(){document.getElementById("node-".concat(n.row,"-").concat(n.col)).className="node node-explore"}),30*e)},s=1;s<=i.length;++s){var r=a(s);if("object"===typeof r)return r.v}}},{key:"render",value:function(){var t=this,e=this.state,n=e.grid,i=e.mouseIsPressed;return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"button-container"},o.a.createElement("h2",{id:"bar-title"},"Pathfinding Visualizer"),o.a.createElement("button",{className:"grid-buttons",disabled:this.state.animationInProgress,onClick:function(){return t.resetGrid()}},"RESET GRID"),o.a.createElement("button",{className:"grid-buttons",disabled:this.state.animationInProgress,onClick:function(){return t.removePaths()}},"CLEAR PATHS"),o.a.createElement("label",{className:"corner-label"},"Allow crossing corners",o.a.createElement("input",{type:"checkbox",id:"check",checked:this.state.crossingCorners,onChange:this.toggleCheckbox})),o.a.createElement("button",{className:"algo-buttons",disabled:this.state.animationInProgress,onClick:function(){return t.dijkstra()}},"Dijkstra's algo"),o.a.createElement("button",{className:"algo-buttons",disabled:this.state.animationInProgress,onClick:function(){return t.aStar()}},"A* Search"),o.a.createElement("button",{className:"algo-buttons",disabled:this.state.animationInProgress,onClick:function(){return t.bidirectionalSearch()}},"Bidirectional Search"),o.a.createElement("button",{className:"algo-buttons",id:"bfs-button",disabled:this.state.animationInProgress,onClick:function(){return t.bfs()}},"BFS"),o.a.createElement("button",{className:"algo-buttons",id:"dfs-button",disabled:this.state.animationInProgress,onClick:function(){return t.dfs()}},"DFS"),o.a.createElement("button",{className:"additional-buttons",disabled:this.state.animationInProgress,onClick:function(){return t.createRandomGrid()}},"CREATE RANDOM GRID")),o.a.createElement("div",{className:"grid"},n.map((function(e,n){return o.a.createElement("div",{className:"rows-distinct",key:n},e.map((function(e,n){var a=e.row,s=e.col,r=e.isStart,u=e.isFinish,c=e.isWall;return o.a.createElement(d,{key:n,row:a,col:s,isStart:r,isFinish:u,isWall:c,mouseIsPressed:i,onMouseDown:function(e,n){return t.handleMouseDown(e,n)},onMouseEnter:function(e,n){return t.handleMouseEnter(e,n)},onMouseUp:function(){return t.handleMouseUp()}})})))}))),o.a.createElement("div",{className:"credits"},o.a.createElement("p",null,"\xa9 Pathfinding Visualizer created by ",o.a.createElement("a",{id:"my-github",href:"https://github.com/nikolatechie"},"Nikola Grujic"))))}}]),n}(o.a.Component),I=function(){p=Math.floor((window.innerHeight-200)/28),b=Math.floor((window.innerWidth-50)/28),E=Math.floor(p/2),p%2!==1&&--E,k=E,y=Math.floor(b/6),w=b-y-1},P=function(){var t=[];I();for(var e=0;e<p;++e){for(var n=[],i=0;i<b;++i)n.push(B(e,i));t.push(n)}return t},B=function(t,e){return{row:t,col:e,isStart:t===E&&e===y,isFinish:t===k&&e===w,distance:1/0,isVisited:!1,isWall:!1,previousNode:null}};n(16);var M=function(){return o.a.createElement("div",{className:"App"},o.a.createElement(N,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(M,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}],[[8,1,2]]]);
//# sourceMappingURL=main.8454facd.chunk.js.map