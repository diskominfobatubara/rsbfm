<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use \Yajra\Datatables\Datatables;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $menu = 'Users';
        if ($request->ajax()) {
            if (Auth::user()->role === '1') {
                $data = User::latest()->get();
            } elseif (Auth::user()->role === '2') {
                $data = User::where('instansi_id', Auth::user()->instansi_id)->latest()->get();
            } else {
                abort(403, 'Gak boleh akses ke sini ya.');
            }
            return Datatables::of($data)
                ->addIndexColumn()
                ->addColumn('role', function ($data) {
                    if ($data->role == 1) {
                        return "Admin";
                    } elseif ($data->role == 2) {
                        return "Instansi";
                    } elseif ($data->role == 3) {
                        return "Bagian / Bidang";
                    }
                })
                ->addColumn('action', function ($row) {
                    $btn = '<a href="javascript:void(0)" data-toggle="tooltip"  data-id="' . $row->id . '" data-original-title="Edit" class="btn btn-primary btn-xs edit"><i class="fas fa-edit"></i></a>';
                    $btn = '<center>' . $btn . ' <a href="javascript:void(0)" data-toggle="tooltip"  data-id="' . $row->id . '" data-original-title="Delete" class="btn btn-danger btn-xs delete"><i class="fas fa-trash"></i></a><center>';
                    return $btn;
                })
                ->rawColumns(['action'])
                ->make(true);
        }

        return view('user.data', compact('menu'));
    }
}
