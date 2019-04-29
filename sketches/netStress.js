function() {
	this.label = "netstress";

	this.VBegin = [
		-1,1,0, -1,-1,0, 1,-1,0, 1,1,0
	];
	this.IBegin = [
		0,1,2, 2,3,0
	];
	this.NBegin = [
		0,0,1, 0,0,1, 0,0,1, 0,0,1
	]

	this.V = [];
	this.I = [];
	this.N = [];

	this.nextCountToAdd = 1;


   this.onClick = ["double buffer size", function(self) {  // swipe right
   	  if (!self) {
   	  	self = this;
   	  }
   	  console.log("doubling buffer size");

      self.addPlane((self.V.length / self.VBegin.length));

      console.log("buff len: " + self.V.length);
   }];


	this.addPlane = function(count) {
		for (let times = 0; times < count; times += 1) {
			const VxOff = (Math.log2(count) * 2);
			const originalCount = this.V.length;
			for (let i = 0; i < this.VBegin.length; i += 1) {
				this.V.push(this.VBegin[i]);
			}
			for (let i = originalCount; i < this.V.length; i += 3) {
				this.V[i] += VxOff;
			}
		}
		for (let times = 0; times < count; times += 1) {
			const planeCount = this.I.length / this.IBegin.length;
			const inc = planeCount * 4;
			for (let i = 0; i < this.IBegin.length; i += 1) {
				this.I.push(this.IBegin[i] + inc);
			}
		}
		for (let times = 0; times < count; times += 1) {
			for (let i = 0; i < this.NBegin.length; i += 1) {
				this.N.push(this.NBegin[i]);
			}
		}

	}

	this.setup = function() {
		this.addPlane(1);
		window.SK = this;
	}
	this.render = function() {
		this.duringSketch(function() {
			mLine([-1, -1], [1, 1]);
			mLine([-1, -1], [1, 1]);
			mLine([-1, -1], [1, 1]);
		});


		this.afterSketch(function() {
			mPolyhedron(this.V, this.I, this.N);
		});
	}
}